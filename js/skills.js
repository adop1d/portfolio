// Skills data organized by category
const skillsData = {
  frontend: {
    name: "Frontend",
    skills: [
      { name: "HTML", icon: "assets/icons/html.png" },
      { name: "CSS", icon: "assets/icons/css.png" },
      { name: "Tailwind", icon: "assets/icons/tailwind.png" },
      { name: "JavaScript", icon: "assets/icons/js.png" },
      { name: "React", icon: "assets/icons/react.png" },
    ]
  },
  backend: {
    name: "Backend",
    skills: [
      { name: "Maven", icon: "assets/icons/maven.png" },
      { name: "Java", icon: "assets/icons/java.png" },
      { name: "Python", icon: "assets/icons/python.png" },
      { name: "Django", icon: "assets/icons/django.webp" },
      { name: "Spring Boot", icon: "assets/icons/spring-boot.png" },
      { name: "Temporal.io", icon: "assets/icons/temporal-io.png" },
      
    ]
  },
  deployment: {
    name: "DevOps",
    skills: [
      { name: "Vercel", icon: "assets/icons/vercel.png" },
      { name: "Docker", icon: "assets/icons/docker.png" },
      { name: "Kubernetes", icon: "assets/icons/k8s.png" },
      { name: "Bash", icon: "assets/icons/bash.png" },
      { name: "Git", icon: "assets/icons/git.png" },
      { name: "GitHub", icon: "assets/icons/github.png" },
    ]
  },
  databases: {
    nameKey: "skills.category.databases",
    skills: [
      { name: "PostgreSQL", icon: "assets/icons/postgresql.png" },
      { name: "Supabase", icon: "assets/icons/supabase.png" }
    ]
  },
  dataScience: {
    name: "AI and Data",
    skills: [
      //{ name: "Oracle Data Science", icon: "assets/icons/oracle-data-science.png" },
      { name: "Oracle AI Foundations", icon: "assets/icons/deep-learning.png" },
      { name: "Excel", icon: "assets/icons/excel.png" },
      { name: "SQL", icon: "assets/icons/sql.png" },

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
    categoryTitle.textContent = category.nameKey && typeof I18N !== 'undefined'
      ? I18N.t(category.nameKey)
      : category.name;
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
