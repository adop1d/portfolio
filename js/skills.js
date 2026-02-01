// Skills data organized by category
const skillsData = {
  frontend: {
    name: "Frontend",
    skills: [
      { name: "HTML", icon: "ico/5968267.png" },
      { name: "CSS", icon: "ico/css.png" },
      { name: "Tailwind", icon: "ico/tailwind.png" },
      {name: "JavaScript", icon: "ico/js.png" },
      { name: "React", icon: "ico/react.png" },
    ]
  },
  backend: {
    name: "Backend",
    skills: [
      { name: "Java", icon: "ico/java.png" },
      { name: "Python", icon: "ico/python-icon-sm.png" },
      { name: "Django", icon: "ico/django.webp" },
      { name: "Spring", icon: "ico/spring.png" },
      { name: "Spring Boot", icon: "ico/spring-boot.png" },
      { name: "Spring Data", icon: "ico/spring-data.png" },
      { name: "Hibernate", icon: "ico/hibernate.png" },
      { name: "Supabase", icon: "ico/supabase.png" }
    ]
  },
  databases: {
    name: "Bases de Datos",
    skills: [
      { name: "PostgreSQL", icon: "ico/Postgresql.png" },
      { name: "SQL", icon: "ico/sql.png" },
      { name: "DBeaver", icon: "ico/DBeaver.png" },
    ]
  },
  tools: {
    name: "Herramientas",
    skills: [
      { name: "Git", icon: "ico/git.png" },
      { name: "GitHub", icon: "ico/github.png" },
      { name: "Docker", icon: "ico/docker.png" },
      { name: "Maven", icon: "ico/maven.png" },
      { name: "Bash", icon: "ico/bash.png" }
    ]
  },
  dataScience: {
    name: "AI and Data",
    skills: [
      { name: "Jupyter", icon: "ico/Jupyter.png" },
      //{ name: "Oracle Data Science", icon: "ico/Oracle Data Science.png" },
      { name: "Oracle AI Foundations", icon: "ico/Deep Learning.png" }
    ]
  }
};

// Render skills in the grid
function renderSkills() {
  const skillsSection = document.getElementById('skills-grid');
  if (!skillsSection) return;

  skillsSection.innerHTML = '';

  Object.keys(skillsData).forEach(categoryKey => {
    const category = skillsData[categoryKey];
    
    // Create category container (add category key as class for precise CSS targeting)
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'skill-category ' + categoryKey;
    
    // Category title
    const categoryTitle = document.createElement('h4');
    categoryTitle.className = 'skill-category-title';
    categoryTitle.style.fontStyle = 'italic';
    categoryTitle.textContent = category.name;
    categoryDiv.appendChild(categoryTitle);
    
    // Skills grid
    const skillsGrid = document.createElement('div');
    skillsGrid.className = 'skill-items-grid';
    
    category.skills.forEach(skill => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      
      const skillIcon = document.createElement('img');
      skillIcon.src = skill.icon;
      skillIcon.alt = skill.name;
      skillIcon.className = 'skill-icon';
      
      const skillTooltip = document.createElement('div');
      skillTooltip.className = 'skill-tooltip';
      skillTooltip.textContent = skill.name;
      
      skillItem.appendChild(skillIcon);
      skillItem.appendChild(skillTooltip);
      skillsGrid.appendChild(skillItem);
    });
    
    categoryDiv.appendChild(skillsGrid);
    skillsSection.appendChild(categoryDiv);
  });
}

// Initialize skills when DOM is ready
document.addEventListener('DOMContentLoaded', renderSkills);
