document.addEventListener("DOMContentLoaded", function() {
    let currentQuestion = 1;
    const totalQuestions = 5;

    function showQuestion(n) {
        document.querySelectorAll(".question").forEach(q => q.style.display = "none");
        document.getElementById("q" + n).style.display = "block";
    }

    document.querySelectorAll(".suivant").forEach((button, index) => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            let selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
            if (!selected) {
                alert("Tu dois répondre à cette question avant de continuer.");
                return;
            }
            if (currentQuestion < totalQuestions) {
                currentQuestion++;
                showQuestion(currentQuestion);
            }
        });
    });

    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        let countA = 0, countB = 0, countC = 0;
        let isValid = true;

        for (let i = 1; i <= totalQuestions; i++) {
            let selected = document.querySelector(`input[name="q${i}"]:checked`);
            if (!selected) {
                isValid = false;
                alert(`Tu dois répondre à cette question avant de continuer`);
                return;
            }
            if (selected.value === "A") countA++;
            else if (selected.value === "B") countB++;
            else countC++;
        }

        if (isValid) {
            donnePersonnalite(countA, countB, countC);
            afficherGraphique(countA, countB, countC);

            // Masquer la question 5 après la soumission
            document.getElementById("q5").style.display = "none";
        }
    });

    showQuestion(currentQuestion);
});

function donnePersonnalite(A, B, C) {
    let max = Math.max(A, B, C);
    let texte = "";
    if(A === max && A === B) texte = `Tu es sur la bonne voie pour un sommeil de qualité, 
    mais il y a encore quelques habitudes à ajuster ! Tu fais des efforts 
    pour limiter les écrans, mais parfois, la tentation est trop forte… 
    Essaie d’adopter une routine relaxante avant de dormir pour améliorer encore plus ton repos !`;
    else if(A === max && A === C) texte = `Un vrai paradoxe du sommeil ! D’un côté, tu connais 
    l’importance du repos, mais de l’autre, les écrans te tiennent en otage… 
    Un petit compromis ? Essaie d’alterner : une nuit écran-free, une nuit comme d’habitude. 
    Tu verras vite ce qui te fait le plus de bien !`;
    else if(B === max && B === C) texte = `On sent que tu aimes tes écrans… peut-être un peu trop ! 
    Tu es conscient(e) que ce n'est pas idéal, mais tu as du mal à décrocher. 
    Pourquoi ne pas essayer un mini-défi ? Une demi-heure sans écran avant de 
    dormir pendant 3 jours… Juste pour voir ?`;
    else if (A === max) texte = `Wow ! Tu es un(e) champion(ne) du sommeil ! 
    Tu as compris que ton cerveau a besoin de repos loin des écrans. 
    Continue comme ça ! Tes matins doivent être bien plus agréables que ceux 
    qui restent scotchés à leur téléphone toute la nuit !`;
    else if (B === max) texte = `Hmm... on sent que tu hésites… Tu sais que les écrans 
    avant de dormir c'est pas top, mais tu n'es pas encore prêt(e) à lâcher ton téléphone. 
    Pourquoi ne pas essayer un petit défi : 1h sans écran avant de dormir pendant 1 semaine? 
    Qui sait, tu pourrais redécouvrir le plaisir de bien dormir ! `;
    else if (C === max) texte = `Aïe aïe aïe… On a un(e) accro aux écrans ici ! 
    Ton cerveau crie au secours et ta mélatonine est en PLS. Si tu galères à 
    t'endormir ou que tu es toujours fatigué(e), il est peut être temps de poser ton téléphone.
    Tente une détox des écrans avant de dormir, tu verras la différence !`;

    document.getElementById("resultat").textContent = texte;
}

function afficherGraphique(A, B, C) {
    let ctx = document.getElementById('graphique').getContext('2d');

    // Calculer la largeur et la hauteur de l'écran (ajuste la taille du graphique)
    let largeur = Math.min(window.innerWidth, 500);  // Largeur max 500px
    let hauteur = Math.min(window.innerHeight, 500); // Hauteur max 500px

    // Appliquer la taille au canvas
    document.getElementById('graphique').width = largeur;
    document.getElementById('graphique').height = hauteur;

    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Dormeur(se) Idéal(e)', 'Dormeur(se) Modéré(e)', 'Dormeur(se) Problématique'],
            datasets: [{
                data: [A, B, C],
                backgroundColor: ['#99c2ff', '#3366cc', '#888888']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}
