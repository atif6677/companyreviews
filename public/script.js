const API_URL = 'http://localhost:3000/reviews';

let selectedRating = 0;

document.querySelectorAll('.stars span').forEach((star) => {
  star.addEventListener('click', () => {
    selectedRating = star.dataset.value; 
    highlightStars(selectedRating);      
  });
});

function highlightStars(rating) {
  document.querySelectorAll('.stars span').forEach((star) => {
    if (star.dataset.value <= rating) {
      star.classList.add('selected');   
    } else {
      star.classList.remove('selected'); 
    }
  });
}


async function submitReview() {
  
  const companyNameInput = document.getElementById('companyName');
  const prosInput = document.getElementById('pros');
  const consInput = document.getElementById('cons');

  const companyName = companyNameInput.value;
  const pros = prosInput.value;
  const cons = consInput.value;

  const rating = parseInt(selectedRating);

  if (!companyName || !rating) {
    alert("Please fill in company name and rating.");
    return;
  }

  const review = { companyName, pros, cons, rating };

  try {
    const res = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });

    alert('Review added successfully!');

    companyNameInput.value = '';
    prosInput.value = '';
    consInput.value = '';
    selectedRating = 0;
    highlightStars(0);


  } catch (err) {
    alert('Error submitting review.');
    console.error(err);
  }


}



async function searchCompany() {
  const name = document.getElementById('searchBox').value.trim();

  if (!name) {
    alert("Please enter a company name to search.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/search?name=${name}`);
    const data = await res.json();

    if (res.status === 404) {
      document.getElementById('results').innerHTML = `<p>No reviews found for "${name}"</p>`;
      return;
    }

    let resultHtml = `<h3>Company Name: ${name}</h3>
     <br>
     <h3>Company Rating: ${data.avgRating.toFixed(1)}</h3>
     <br>
     <ul>`;

    data.reviews.forEach((review) => {
      resultHtml += `<li>
        <strong>Pros:</strong> ${review.pros}<br />
        <strong>Cons:</strong> ${review.cons}<br />
        <strong>Rating:</strong> ${review.rating} <br />
      </li><hr />`;
    });

    resultHtml += '</ul>';

    document.getElementById('results').innerHTML = resultHtml;
  } catch (err) {
    document.getElementById('results').innerHTML = '<p>Error fetching results</p>';
    console.error(err);
  }
}
