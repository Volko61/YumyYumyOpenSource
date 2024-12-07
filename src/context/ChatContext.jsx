import { createContext, useState, useRef, useEffect, useContext } from 'react';
import { generateBotResponse, LLMcall } from '../utils/Chatbot';
import { analyseUserAnwser } from '../components/Artefacts';
import { ArtefactContext } from './ArtefactContext';
import { MealContext } from './MealsContext';
import { InformationsForMealContext } from './InformationsForMeals';
import OpenAI from 'openai';
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const { isShowArtefact, setShowArtefact } = useContext(ArtefactContext);
  const { numberOfMeals, setNumberOfMeals, infosAboutEaters, setInfosAboutEaters } = useContext(InformationsForMealContext);
  const { meals, setMeals, indexOfCurrentMeal, setIndexOfCurrentMeal } = useContext(MealContext);
  const [input, setInput] = useState('');
  // const [systemPrompt, setSystemPrompt] = useState(`
  //   You are an helpfull cooking assistant named YumyYumy. Here is what the user wants : $userInput . 
  //   `);
  const [systemPrompt, setSystemPrompt] = useState(`Réponds en Francais
      `);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const startConversation = async () => {
      const firstQuestion = await generateBotResponse("Entamez une conversation pour planifier un repas via une courte phrase drole. Explique que tu es YumyYumy, une IA qui va l'aider à plannifier ses repas pour la semaine (et fournir recettes, prix, ingrédients) en fonction de ce que l'utilisateur aime, son budget, ses contraintes en tout genre etc. Dans cette phrase, demande à l'utilisateur le nombre de repas qu'il souhaite planifier. Ne mets pas de \" \". Réponds uniquement en fournissant cette courte phrase. Réponds dans un francais correct", 'bot');
      setMessages([firstQuestion]);
    };
    startConversation();
  }, []);

  // Scroll to the bottom of the chat container whenever messages change
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message and generating bot response
  const handleSend = async (message) => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', text: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const botResponse = await analyseUserAnwser(messages, message, setMeals, setShowArtefact, setMessages, setNumberOfMeals, setInfosAboutEaters);

  };



  const value = {
    messages,
    setMessages,
    input,
    setInput,
    chatEndRef,
    handleSend,
    systemPrompt,
    setSystemPrompt,
    scrollToBottom,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
// Fonction pour générer des repas
export async function generateMealPlan(numberOfMeals, eaterInfo, priceRangeMealsLocal) {
  const client = new OpenAI({
    apiKey: "this-is-dummy-key",  // Remplacez par la clé API réelle
    baseURL: "", // your api endpoint url
    dangerouslyAllowBrowser: true,
  });

  const newMeals = [];

  for (let i = 0; i < numberOfMeals; i++) {
    try {
      // Ajuster la date pour chaque repas
      const mealDate = new Date();
      mealDate.setDate(mealDate.getDate() + i);
      const formattedDate = mealDate.toISOString().split("T")[0]; // Formater la date comme YYYY-MM-DD

      // Prompt pour une sortie JSON structurée
      const prompt = `\
        Voici quelques infos sur le mangeur :
        "${eaterInfo}"

        Voici les repas que tu lui as déjà créés :
        ${JSON.stringify(newMeals)}

        Créer un nouveau repas pour lui. Le mangeur veut un repas ${priceRangeMealsLocal}.

        Évite de refaire un repas qui a déjà été fait, mais n'hésite pas à réutiliser des aliments afin que les courses soient moins chères.

        Mettre la bonne date à ce repas. Par exemple, si le repas précédent était "petit déjeuner demain", celui-ci doit être celui du "déjeuner demain", et ainsi de suite.

        Affichez le résultat sous forme de JSON valide uniquement, avec la structure suivante :
        {
          "date": "chaîne (ex: 'petit déjeuner demain', 'dîner après demain')",
          "mealName": "chaîne (nom du repas ou de la recette)",
          "recipe": "chaîne (recette complète)",
          "preparationTime": "chaîne (temps de préparation avec unité, ex: '15 minutes')",
          "cookingTime": "chaîne (temps de cuisson avec unité, ex: '30 minutes')",
          "ingredients": ["tableau de chaînes (liste des ingrédients avec quantités)"],
          "totalPrice": "chaîne (coût total estimé des ingrédients en euros, ex: '10 euros')"
        }

        Aucun autre texte ne doit être inclus. Seul le JSON. N'utilisez pas de \`\`\` ni aucun autre formatage.
      `;

      const mealCompletion = await client.chat.completions.create({
        model: "gpt-4-0613",
        messages: [
          { role: "system", content: "Vous générez une sortie JSON structurée pour le repas." },
          { role: "user", content: prompt },
        ],
      });

      // Parser la réponse JSON
      const jsonResponse = mealCompletion.choices[0].message.content;
      const parsedMeal = JSON.parse(jsonResponse);

      // Assurer que chaque repas a toutes les propriétés requises
      newMeals.push({
        date: parsedMeal.date || "Date non spécifiée",
        mealName: parsedMeal.mealName || "Nom de la recette non spécifié",
        recipe: parsedMeal.recipe || "Recette non spécifiée",
        preparationTime: parsedMeal.preparationTime || "Temps de préparation non spécifié",
        cookingTime: parsedMeal.cookingTime || "Temps de cuisson non spécifié",
        totalPrice: parsedMeal.totalPrice || "Prix total non spécifié",
        ingredients: Array.isArray(parsedMeal.ingredients) ? parsedMeal.ingredients : [],
      });
    } catch (error) {
      console.error("Erreur lors de la génération du repas :", error);
    }
  }

  return newMeals;
}