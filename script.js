// Fetch and display all GitHub repos for sainymishra
async function fetchAndDisplayRepos() {
  const container = document.getElementById('github-repos-container');
  if (!container) return;
  try {
    const response = await fetch('https://api.github.com/users/Sainy-Mishra/repos');
    const repos = await response.json();
    container.innerHTML = '';
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'repo-card';
      card.innerHTML = `
        <div class="repo-card-title">${repo.name}</div>
        <div class="repo-card-desc">${repo.description ? repo.description : 'No description provided.'}</div>
        <a class="repo-card-link" href="${repo.html_url}" target="_blank">View Repo</a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<p>Unable to fetch repositories at this time.</p>';
  }
}

// Run on page load
// Fetch and display all GitHub repos for Sainy-Mishra
async function fetchAndDisplayRepos() {
  const container = document.getElementById('github-repos-container');
  if (!container) return;
  try {
    const response = await fetch('https://api.github.com/users/Sainy-Mishra/repos');
    const repos = await response.json();
    container.innerHTML = '';
    repos.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'repo-card';
      card.innerHTML = `
        <div class="repo-card-title">${repo.name}</div>
        <div class="repo-card-desc">${repo.description ? repo.description : 'No description provided.'}</div>
        <a class="repo-card-link" href="${repo.html_url}" target="_blank">View Repo</a>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    container.innerHTML = '<p>Unable to fetch repositories at this time.</p>';
  }
}

window.addEventListener('DOMContentLoaded', fetchAndDisplayRepos);
window.addEventListener('DOMContentLoaded', fetchAndDisplayRepos);
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
