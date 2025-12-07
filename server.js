// server.js
// 1.importer les librairies
const express = require('express');
const path = require('path'); // on ajoute les path pour gerer les chemins
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3000; // utiliser le PORT fourni par l'environnement, sinon utiliser 3000 par defaut
const HOST = '0.0.0.0'

// configuration pour Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILWILLY,
        pass: 'tlql rbmz oeyp hnap'
    }
});



// middleware pour traiter les donnés de formulaire
app.use(express.urlencoded({ extended: true }));
// definir EJS comme moteur de templating(sera utilisé pour l'affichage)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//route 1: afficher l'acceuil
app.get('/', (req, res) => {
    res.render('accueil', { title: 'Mon accueil' });
});
//route 2: afficher les services
app.get('/services', (req, res) => {
    res.render('services', { title: 'Nos services' });
});
// route 3: afficher les realisation
app.get('/realisations', (req, res) => {
    res.render('realisations', { tltle: 'Nos realisation' });
});
// route 4: afficher les contacts
app.get('/contacts', (req, res) => {
    res.render('contacts', { title: 'Contactez-nous' });
});
// route 5: Traitement du formulaire
app.post('/contacts', (req, res) => {
    console.log('formulaire recu!');
    // Les données du formulaires
    const { Nom, Mail, Message } = req.body;

    // contenue de l'email---
    const mailOptions = {
        from: `"${Nom}" <${Mail}>`,
        to: 'williamoelat12@gmail.com',
        subjecct: `Nouveau message de contact EWF-Dev de ${Nom}`,
        text: `Message de : ${Nom}\nEmail : ${Mail}\n\nMessage :\n${Message}`,
        html: `<p><strong>Message de :</strong> ${Mail}</p>
               <p><strong>Email :</stong>${Mail}</p>
               <p><strong>Message :</strong></p>
               <p>${Message}</p>`
    };

    // envoie du mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur de Nodemailer :', error);
            // si ehec
            return res.status(500).send('Une erreur est survenue lors de l\envoi du Message.');
        }
    });
    // apres le traitement
    res.send('Merci, votre message a été bien envoyé!');
});

// démarer le serveur
app.listen(PORT, HOST, () => {
    console.log(`serveur démarré sur http://${HOST}:${PORT}`);
    console.log('le site est pret à etre visité.');
});