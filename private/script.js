const API_URL = 'http://localhost:3000/reviews';

let selectedRating = 0;

document.querySelectorAll('.stars span').forEach((star) => {
  star.addEventListener('mouseover', () => {
    highlightStars(star.dataset.value);
  });

  star.addEventListener('mouseout', () => {
    highlightStars(selectedRating);
  });

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
  const companyName = document.getElementById('companyName').value;
  const pros = document.getElementById('pros').value;
  const cons = document.getElementById('cons').value;
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

    const data = await res.json();
    alert('Review added successfully!');
  } catch (err) {
    alert('Error submitting review.');
    console.error(err);
  }
}

async function searchCompany() {
  const name = document.getElementById('searchBox').value;

  try {
    const res = await fetch(`${API_URL}/search?name=${name}`);
    const data = await res.json();

    if (res.status === 404) {
      document.getElementById('results').innerHTML = `<p>No reviews found for "${name}"</p>`;
      return;
    }

    let html = `<h3>Company Name: ${name}</h3>
    <br>
     <h3>Company Rating: ${data.avgRating.toFixed(1)}</h3>
     <br>
     <ul>`;

    data.reviews.forEach((review) => {
      html += `<li>
        <strong>Pros:</strong> ${review.pros}<br />
        <strong>Cons:</strong> ${review.cons}<br />
        <strong>Rating:</strong> ${review.rating} <br />
      </li><hr />`;
    });
    html += '</ul>';

    document.getElementById('results').innerHTML = html;
  } catch (err) {
    document.getElementById('results').innerHTML = '<p>Error fetching results</p>';
    console.error(err);
  }
}
