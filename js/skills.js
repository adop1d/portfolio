// Skills data organized by category
const skillsData = {
  frontend: {
    name: "Frontend",
    skills: [
      { name: "HTML", icon: "ico/5968267.png" },
      { name: "CSS", icon: "ico/css.png" },
      { name: "Tailwind", icon: "ico/tailwind.png" },
      { name: "JavaScript", icon: "ico/js.png" },
      { name: "React", icon: "ico/react.png" },
    ]
  },
  backend: {
    name: "Backend",
    skills: [
      { name: "Maven", icon: "ico/maven.png" },
      { name: "Java", icon: "ico/java.png" },
      { name: "Python", icon: "ico/python-icon-sm.png" },
      { name: "Django", icon: "ico/django.webp" },
      { name: "Spring Boot", icon: "ico/spring-boot.png" },
      { name: "Temporal.io", icon: "ico/temporal-io.png" },
      
    ]
  },
  deployment: {
    name: "DevOps",
    skills: [
      { name: "Vercel", icon: "ico/vercel.png" },
      { name: "Docker", icon: "ico/docker.png" },
      { name: "Kubernetes", icon: "ico/k8s.png" },
      { name: "Bash", icon: "ico/bash.png" },
      { name: "Git", icon: "ico/git.png" },
      { name: "GitHub", icon: "ico/github.png" },
    ]
  },
  databases: {
    nameKey: "skills.category.databases",
    skills: [
      { name: "PostgreSQL", icon: "ico/Postgresql.png" },
      { name: "Supabase", icon: "ico/supabase.png" }
    ]
  },
  dataScience: {
    name: "AI and Data",
    skills: [
      //{ name: "Oracle Data Science", icon: "ico/Oracle Data Science.png" },
      { name: "Oracle AI Foundations", icon: "ico/Deep Learning.png" }
      { name: "Excel", icon: "ico/Microsoft_Office_Excel_(2025–present).svg.png" },
      { name: "SQL", icon: "ico/sql.png" },

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
