import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// HTML content
const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nossa Equipe</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
      .container { max-width: 800px; margin: auto; }
      h1 { color: #333; }
      p { line-height: 1.6; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>NOSSA EQUIPE</h1>
      <p>Página com o nome dos integrantes da nossa equipe.</p>
      <p><strong>Autores:</strong></p>
      <ul>
        <li>500629 - Antônio Mateus Gonçalves de Souza - Design Digital</li>
        <li>512278 - João Victor Bezerra dos Santos - Design Digital</li>
        <li>493433 - Matheus Dantas Batista - Design Digital</li>
        <li>471278 - Thais Lara Figeredo de Almeida - Design Digital</li>
      </ul>
    </div>
  </body>
  </html>
`;

app.get('*', (req: Request, res: Response) => {
  res.send(htmlContent);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
