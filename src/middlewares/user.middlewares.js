const isUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        next();
    } else {
        const unauthorizedMessage = 'Unauthorized access. Please log in as a regular user to access this resource.';
        const sweetAlertScript = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Access Denied</title>
                <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
            </head>
            <body>
                <script>
                    Swal.fire({ title: 'Access Denied', text: '${unauthorizedMessage}', icon: 'error' }).then(() => window.location.href = '/');
                </script>
            </body>
            </html>
        `;
        res.send(sweetAlertScript);
    }
};

module.exports = isUser;