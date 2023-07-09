document.addEventListener('DOMContentLoaded', () => {
    const preferencesForm = document.getElementById('preferences-form');
    const recommendationsContainer = document.getElementById('recommendations-container');
  
    preferencesForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const genreInput = document.getElementById('genre-input').value;
      const ratingInput = document.getElementById('rating-input').value;
      const actorInput = document.getElementById('actor-input').value;
      const characteristicInput = document.getElementById('characteristic-input').value;
  
      const requestBody = {
        genre: genreInput,
        rating: ratingInput,
        actor: actorInput,
        characteristic: characteristicInput
      };
  
      try {
        const response = await fetch('/generate-recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
  
        const data = await response.json();
        const recommendations = data.recommendations;
        const explanations = data.explanations;
  
        // Update the UI with recommendations and explanations
        updateRecommendationsUI(recommendations, explanations);
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    function updateRecommendationsUI(recommendations, explanations) {
      // Clear previous recommendations
      recommendationsContainer.innerHTML = '';
  
      if (recommendations.length === 0) {
        recommendationsContainer.textContent = 'No recommendations found.';
        return;
      }
  
      // Create a list of recommendations
      const recommendationsList = document.createElement('ul');
      recommendationsList.classList.add('recommendations-list');
  
      // Iterate over each recommendation
      recommendations.forEach((recommendation, index) => {
        const explanation = explanations[index];
  
        // Create list item for each recommendation
        const recommendationItem = document.createElement('li');
        recommendationItem.textContent = recommendation;
  
        // Create explanation element for each recommendation
        const explanationElement = document.createElement('p');
        explanationElement.textContent = explanation;
        explanationElement.classList.add('explanation');
  
        // Append recommendation and explanation to the list item
        recommendationItem.appendChild(explanationElement);
  
        // Append the list item to the recommendations list
        recommendationsList.appendChild(recommendationItem);
      });
  
      // Append the recommendations list to the recommendations container
      recommendationsContainer.appendChild(recommendationsList);
    }
  });
  