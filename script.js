// Look at the href for the link for cheesegrater and the id in that projects.json.
// Make sure you follow the same thing inside the new files
//  Now all you need to do is create the new folder for the other projects and add the project details in the JSON file
// Then copy the index.html into the new folder and it should work automatically

const titleElement = document.getElementById("title");
const overviewElement = document.getElementById("overview");
const objectiveElement = document.getElementById("objective");
const skillsListElement = document.getElementById("skills-list");
const toolsListElement = document.getElementById("tools-list");
const challengeListElement = document.getElementById("challenge-list");
const partDrawingsElement = document.getElementById("part-drawings");
const explodedAssemblyElement = document.getElementById("exploded-assembly");
const videoElement = document.getElementById("video");

const locate = window.location.pathname;
console.log(locate);

const projectsJson = fetch("../data/projects.json")
  .then((response) => response.json())
  .then((data) => {
    const projectId = locate.split("/").filter(Boolean).pop();
    const projectInfo = data.find((project) => project.id === projectId);

    titleElement.textContent = projectInfo.title;
    overviewElement.textContent = projectInfo.overview;
    objectiveElement.textContent = projectInfo.objective;

    // Skills Applied
    projectInfo.skills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsListElement.appendChild(li);
    });

    // Tools & Software
    projectInfo.tools.forEach((tool) => {
      const li = document.createElement("li");
      li.textContent = tool;
      toolsListElement.appendChild(li);
    });

    // Obstacles and Solutions
    projectInfo.obstacles_and_solutions.forEach((item) => {
      const challengeItemDiv = document.createElement("div");
      challengeItemDiv.classList.add("challenge-item");

      const obstacleLabelDiv = document.createElement("div");
      obstacleLabelDiv.classList.add("label", "obstacle");
      obstacleLabelDiv.textContent = "Obstacle:";
      challengeItemDiv.appendChild(obstacleLabelDiv);

      const obstacleP = document.createElement("p");
      obstacleP.textContent = item.obstacle;
      challengeItemDiv.appendChild(obstacleP);

      const solutionLabelDiv = document.createElement("div");
      solutionLabelDiv.classList.add("label", "solution");
      solutionLabelDiv.textContent = "Solution:";
      challengeItemDiv.appendChild(solutionLabelDiv);

      const solutionP = document.createElement("p");
      solutionP.textContent = item.solution;
      challengeItemDiv.appendChild(solutionP);

      challengeListElement.appendChild(challengeItemDiv);
    });

    // Part Drawings
    projectInfo.part_drawings.forEach((drawing) => {
      const a = document.createElement("a");
      a.href = drawing.src;
      a.dataset.lightbox = "drawings";
      a.dataset.title = drawing.title;

      const galleryItemDiv = document.createElement("div");
      galleryItemDiv.classList.add("gallery-item");

      const img = document.createElement("img");
      img.src = drawing.src;
      img.alt = drawing.title;

      galleryItemDiv.appendChild(img);
      a.appendChild(galleryItemDiv);
      partDrawingsElement.appendChild(a);
    });

    // Exploded Assembly
    explodedAssemblyElement.href = projectInfo.exploded_assembly.src;
    explodedAssemblyElement.innerHTML = `
        <div class="gallery-item">
            <img src="${projectInfo.exploded_assembly.src}" alt="${projectInfo.exploded_assembly.title}"/>
        </div>
    `;

    // Video
    if (projectInfo.video && projectInfo.video.type === "tiktok") {
      videoElement.innerHTML = `
            <blockquote class="tiktok-embed" cite="${projectInfo.video.cite}" data-video-id="${projectInfo.video.id}" style="max-width: 800px;min-width: 360px;">
                <section>
                    <a target="_blank" title="${projectInfo.video.username}" href="https://www.tiktok.com/${projectInfo.video.username}?refer=embed">
                        ${projectInfo.video.username}
                    </a>
                    <p>${projectInfo.video.title}</p>
                    <a target="_blank" title="♬ original sound - MULTZ" href="${projectInfo.video.sound_href}"></a>
                </section>
            </blockquote>
        `;
    }
  });
