class Meal {
    date = '';
    ingredients = [];
    recipe = '';
  
    setDate(date) {
      this.date = date;
    }
  
    addIngredient(ingredient) {
      this.ingredients.push(ingredient);
    }
  
    removeIngredient(ingredient) {
      this.ingredients = this.ingredients.filter(i => i !== ingredient);
    }
  
    setRecipe(recipe) {
      this.recipe = recipe;
    }
  }

  export default Meal;

