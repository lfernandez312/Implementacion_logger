const fs = require('fs').promises;

class FilesDao {
  constructor(file) {
    this.file = process.cwd() + `/src/files/${file}`;
  }

  async createFileIfNotExists() {
    try {
      await fs.access(this.file);
    } catch (error) {
      // El archivo no existe, así que intenta crearlo con un array vacío
      await this.writeItems([]);
    }
  }

  async getItems() {
    await this.createFileIfNotExists(); // Asegurarse de que el archivo exista
    try {
      const data = await fs.readFile(this.file, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al leer el archivo:', error);
      return [];
    }
  }

  async writeItems(items) {
    try {
      await fs.writeFile(this.file, JSON.stringify(items, null, 2), 'utf-8');
      console.log('Archivo escrito correctamente:', this.file);
    } catch (error) {
      console.error('Error al escribir en el archivo:', this.file, error);
    }
  }
  
}

module.exports = FilesDao;