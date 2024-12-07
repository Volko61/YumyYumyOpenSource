import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import { MealContext } from '../context/MealsContext';
import Meal from '../class/Meal';
import { InformationsForMealContext } from '../context/InformationsForMeals';
import { LLMcall } from '../utils/Chatbot';
import { ArtefactContext } from '../context/ArtefactContext';
import { generateMealPlan } from '../context/ChatContext';
import { jsPDF } from 'jspdf';

export default function Artefacts() {
  const { numberOfMeals, setNumberOfMeals, infosAboutEaters, setInfosAboutEaters } = useContext(InformationsForMealContext);
  const { isShowArtefacts, setShowArtefacts } = useContext(ArtefactContext);

  const { meals, setMeals, indexOfCurrentMeal, setIndexOfCurrentMeal } = useContext(MealContext);
  const [showMeal, setShowMeal] = useState(true);

  const handleMealClick = (index) => {
    setIndexOfCurrentMeal(index);
    setShowMeal(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const sortedMeals = [...meals].sort((a, b) => new Date(a.date) - new Date(b.date));
  
    // Centered Header - Plan de Repas
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(66, 123, 157); // Muted Blue for the title
    const title = 'Plan de Repas';
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (doc.internal.pageSize.width - titleWidth) / 2, 20);
  
    // Centered Intro Text - Détails de chaque repas
    doc.setFontSize(12);
    doc.setTextColor(42, 46, 53); // Charcoal Gray for body text
    const introText = 'Détails de chaque repas';
    const introTextWidth = doc.getTextWidth(introText);
    doc.text(introText, (doc.internal.pageSize.width - introTextWidth) / 2, 30);
  
    // Add each meal's details
    sortedMeals.forEach((meal, index) => {
      if (index > 0) {
        doc.addPage(); // Add a new page for each new meal
      }
  
      const startY = 40; // Ensure the meal starts at the top of the page
  
      // Meal title - Fresh Green color
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(168, 213, 186); // Fresh Green for meal title
      doc.text(`Repas ${index + 1}: ${meal.mealName}`, 20, startY);
  
      // Meal details (Date, Preparation time, Cooking time, Estimated price)
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(42, 46, 53); // Charcoal Gray for body text
      doc.text(`Date: ${meal.date}`, 20, startY + 10);
  
      // Use Success Yellow for preparation time and cooking time
      doc.setTextColor(246, 198, 103); // Sunlit Yellow
      doc.text(`Temps de préparation: ${meal.preparationTime}`, 20, startY + 20);
      doc.text(`Temps de cuisson: ${meal.cookingTime}`, 20, startY + 30);
  
      // Use Warning Orange for price
      doc.setTextColor(244, 162, 97); // Warm Orange
      doc.text(`Prix estimé: ${meal.totalPrice}`, 20, startY + 40);
  
      // Ingredients list - use secondary color as background for table-like layout
      doc.setFontSize(12);
      doc.setTextColor(42, 46, 53); // Charcoal Gray for ingredients
      doc.setFont("helvetica", "bold");
      doc.text('Ingrédients:', 20, startY + 50);
  
      const ingredients = meal.ingredients || [];
      let ingredientY = startY + 60;
      ingredients.forEach((ingredient, i) => {
        // Prevent overflow by checking if the ingredient fits on the page
        if (ingredientY > 270) {
          doc.addPage(); // Add a new page if the content overflows
          ingredientY = 20; // Reset Y position for the new page
        }
  
        // Alternate row colors for better readability
        if (i % 2 === 0) {
          doc.setFillColor(255, 232, 214); // Soft Beige for even rows
        } else {
          doc.setFillColor(240, 244, 248); // Light Gray for odd rows
        }
  
        doc.rect(20, ingredientY - 3, 180, 10, 'F'); // Draw a filled rectangle for each ingredient
        doc.setTextColor(42, 46, 53); // Charcoal Gray for text
        doc.text(`${i + 1}. ${ingredient}`, 22, ingredientY);
  
        ingredientY += 12;
      });
  
      // Add space before starting the recipe section
      ingredientY += 10; // Add extra space between ingredients and recipe
  
      // Recipe section - Use info color for section title
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(69, 123, 157); // Muted Blue for recipe section title
      doc.text('Recette:', 20, ingredientY);
      ingredientY += 10; // Add extra space between ingredients and recipe
  
      const recipeText = meal.recipe || 'Recette non disponible';
      const recipeLines = doc.splitTextToSize(recipeText, 180); // Wrap the recipe text to fit within 180mm width
  
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(42, 46, 53); // Charcoal Gray for recipe text
      recipeLines.forEach((line, lineIndex) => {
        // Prevent overflow for recipe text
        if (ingredientY + (lineIndex * 10) > 270) {
          doc.addPage(); // Add a new page if recipe text overflows
          ingredientY = 20; // Reset Y position for the new page
        }
        doc.text(line, 20, ingredientY + (lineIndex * 10));
      });
    });
  
    // Save the PDF
    doc.save('plan_de_repas.pdf');
  };
  
  
  

  useEffect(() => {
    // const newMeal1 = {date: "Demain", ingredients:["ingredients1", "ingredients2"], recipe:"recipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\nrecipe1\n"};
    // const newMeal2 = {date: "Demain", ingredients:["ingredients1", "ingredients2"], recipe:"recipe1"};
    // setMeals([newMeal1, newMeal2]);
  }, []);

  return (
    <>
      <Container className="flex-grow-1 d-flex bg-success rounded-4 p-3 mb-3">
        <Container>
          {/* Button to save all meals as PDF */}
          <Container className="d-flex justify-content-center mt-3">
            <button onClick={generatePDF} className="btn btn-primary">
              Télécharger en PDF
            </button>
          </Container>
          <h2>Repas</h2>
          <ul className='list-unstyled'>
            {meals
              // .sort((a, b) => {
              //   const dateA = new Date(a.date);
              //   const dateB = new Date(b.date);
              //   return dateA - dateB;
              // })
              .map((meal, index) => (
                <li
                  className={index === indexOfCurrentMeal ? 'bg-white ' : ''}
                  key={index}
                  onClick={() => handleMealClick(index)}
                >
                  {meal.date}
                </li>
              ))}
          </ul>
        </Container>
        <Container className='overflow-auto'>
          {showMeal && (
            <>
              <h2>Détails sur le repas</h2>
              <p>{meals[indexOfCurrentMeal]?.date} - {meals[indexOfCurrentMeal]?.mealName}</p>
              <p>Temps de préparation: {meals[indexOfCurrentMeal]?.preparationTime}</p>
              <p>Temps de cuisson: {meals[indexOfCurrentMeal]?.cookingTime}</p>
              <p>Prix estimé: {meals[indexOfCurrentMeal]?.totalPrice}</p>
              <p>Ingredients:</p>
              <ul>
                {Array.isArray(meals[indexOfCurrentMeal]?.ingredients) && meals[indexOfCurrentMeal]?.ingredients.length > 0 ? (
                  meals[indexOfCurrentMeal]?.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))
                ) : (
                  <li>Erreur : Ingrédients non générés</li>
                )}
              </ul>
              <p>Recette: {meals[indexOfCurrentMeal]?.recipe}</p>
            </>
          )}
        </Container>
      </Container>
    </>
  );
}
export const analyseUserAnwser = async (messages, message, setMeals, setShowArtefact, setMessages, setNumberOfMeals, setInfosAboutEaters) => {
  try {
    // Extract text content from all messages
    const messageTexts = messages.map(msg => msg.text).join(" ");  // Combine all message texts into a single string
    const fullMessage = messageTexts + message;  // Concatenate the existing message

    // Now pass the fullMessage for LLMcall
    const numberMealsLocal = await LLMcall(`À partir de "${fullMessage}", essayer d'extraire le nombre de repas que l'utilisateur souhaite planifier. Soit sur de combien de repas l'utilisateur souhaites. Répondre uniquement en fournissant la valeur entière. Si cette information n'est pas dans le message, renvoyer "<not_provided>".`);

    if (numberMealsLocal !== "<not_provided>") {
      setNumberOfMeals(parseInt(numberMealsLocal));
    }

    // Now pass the fullMessage for LLMcall
    const priceRangeMealsLocal = await LLMcall(`À partir de "${fullMessage}", détecte des expressions liées au budget des repas, par exemple : "économique", "petit budget", "soirée spéciale", "haut de gamme", "luxe", ou "repas rapide". Si tu ne trouves rien de clair, retourne "<not_provided>".`);

    if (priceRangeMealsLocal !== "<not_provided>") {
      setNumberOfMeals(parseInt(priceRangeMealsLocal));
    }

    const infosAboutEatersLocal = await LLMcall(`À partir de "${fullMessage}", essayer d'extraire les informations sur ce que les personnes aiment et ce qu'elles n'aiment pas. Répondre uniquement en fournissant la valeur des informations. Si cette information n'est pas dans le message, renvoyer juste "<not_provided>" et rien d'autre du tout.`);

    if (infosAboutEatersLocal !== "<not_provided>") {
      setInfosAboutEaters(infosAboutEatersLocal);
    }

    // 2. Vérifier si nous avons tout ce qu'il faut
    if (numberMealsLocal !== "<not_provided>" && infosAboutEatersLocal !== "<not_provided>" && priceRangeMealsLocal !== "<not_provided>") {
      const newMeals = await generateMealPlan(numberMealsLocal, infosAboutEatersLocal, priceRangeMealsLocal)

      setMeals((prevMeals) => newMeals);
      setShowArtefact(true);

      const funnyConfirmation = await LLMcall(`Créer une courte affirmation humoristique pour dire à l'utilisateur que nous avons réussi à créer son plan de repas. Réponds uniquement en fournissant cette courte affirmation`);
      setMessages((prevMessages) => [...prevMessages, { role: 'bot', text: funnyConfirmation }]);
    } else {
      // 3. Si nous manquons des informations, créer une question humoristique pour les informations manquantes
      const missingInfo = [];
      if (numberMealsLocal === "<not_provided>") missingInfo.push("combien de repas planifier");
      if (priceRangeMealsLocal === "<not_provided>") missingInfo.push("quels genre de prix de repas (économique, pour soirée, pour riche). Dis le d'une bonne manière.");
      if (infosAboutEatersLocal === "<not_provided>") missingInfo.push("préférences des convives, soit concis");

      const funnyQuestion = await LLMcall(`Demander rapidement ${missingInfo.join(" et ")}. Réponds uniquement en fournissant cette courte demande`);

      const botMessage = {
        role: 'bot',
        text: funnyQuestion,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }
  } catch (error) {
    console.error('Erreur dans analyseUserAnwser :', error);
  }
};
