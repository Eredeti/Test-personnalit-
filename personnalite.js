document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire
    let countA = 0;
    let countB = 0;
    let countC = 0;
    let countpb = 0;

    let isValid = true; // Variable pour vérifier si toutes les questions sont répondues

    // Parcours chaque groupe de boutons radio (chaque question)
    for (let i = 1; i <= 5; i++) {
        let questionRadios = document.querySelectorAll(`input[name="q${i}"]:checked`);
        if (questionRadios.length === 0) { // Si aucune réponse n'est sélectionnée pour cette question
            isValid = false;
            alert(`Tu n'as pas répondu à la question ${i}.`); // Alerte pour la question non répondue
            break; // Arrête le processus si une question n'a pas de réponse
        }
    }

    // Si toutes les questions sont répondues, procède au calcul des résultats
    if (isValid) {
        let radios = document.querySelectorAll('input[type="radio"]:checked');
        radios.forEach(radio => {
            if (radio.value === "A") {
                countA++;
            } else if (radio.value === "B") {
                countB++;
            } else if (radio.value === "C") {
                countC++;
            }
        });

        donnePersonnalite(countA, countB, countC);
        afficherGraphique(countA, countB, countC);
    }
});


function donnePersonnalite(A, B, C) {
    let max = Math.max(A, B, C);
    let personnalites = [];

    if (A === max) {
        personnalites.push("A");
    }
    if (B === max) {
        personnalites.push("B");
    }
    if (C === max) {
        personnalites.push("C");
    }

    document.getElementById("resultat").textContent = "Tu es de la personnalité : " + personnalites.join(" et ");
}

function afficherGraphique(A, B, C) {
    let ctx = document.getElementById('graphique').getContext('2d');

    // Vérifie s'il y a déjà un graphique pour le supprimer avant d'en créer un nouveau
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    // Création du graphique en camembert
    window.myChart = new Chart(ctx, {
        type: 'pie', // Type de graphique : camembert
        data: {
            labels: ['A', 'B', 'C'], // Labels pour les catégories
            datasets: [{
                label: 'Répartition des réponses',
                data: [A, B, C], // Valeurs associées
                backgroundColor: ['red', 'blue', 'green'], // Couleurs des segments
                borderColor: ['darkred', 'darkblue', 'darkgreen'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            // Affichage du pourcentage et du nombre dans l'info-bulle
                            let total = tooltipItem.dataset.data.reduce((sum, value) => sum + value, 0);
                            let percentage = Math.round((tooltipItem.raw / total) * 100);
                            return tooltipItem.label + ': ' + percentage + '% (' + tooltipItem.raw + ' réponses)';
                        }
                    }
                },
                legend: {
                    position: 'top', // Position de la légende
                }
            }
        }
    });
}