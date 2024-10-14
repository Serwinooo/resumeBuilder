document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const locationInput = document.getElementById('location');
    const websiteInput = document.getElementById('website');
    const workExperienceContainer = document.getElementById('work-experience');
    const educationContainer = document.getElementById('education');
    const skillsContainer = document.getElementById('skills');
    const projectsContainer = document.getElementById('projects');

    const previewName = document.getElementById('preview-name');
    const previewPhone = document.getElementById('preview-phone');
    const previewLocation = document.getElementById('preview-location');
    const previewWebsite = document.getElementById('preview-website');
    const previewWorkExperience = document.getElementById('preview-work-experience');
    const previewEducation = document.getElementById('preview-education');
    const previewSkillsList = document.getElementById('preview-skills');
    const previewProjects = document.getElementById('preview-projects');

    function updateContactPreview() {
        previewName.innerHTML = nameInput.value || 'Your Name';
        previewPhone.innerHTML = `${phoneInput.value || '(123) 456-7890'}`;
        previewLocation.innerHTML = `${locationInput.value || 'City, Country'}`;
        previewWebsite.innerHTML = `<a href="${websiteInput.value || '#'}">${websiteInput.value || 'yourwebsite.com'}</a>`;
    }

    nameInput.addEventListener('input', updateContactPreview);
    phoneInput.addEventListener('input', updateContactPreview);
    locationInput.addEventListener('input', updateContactPreview);
    websiteInput.addEventListener('input', updateContactPreview);

    function updateAddButtons() {
        const experienceItems = workExperienceContainer.querySelectorAll('.work-experience-item');
        
        experienceItems.forEach((item, index) => {
            const addButton = item.querySelector('.add-experience');
            if (index === experienceItems.length - 1) {
                // Show the "Add" button only on the last item
                addButton.style.display = 'inline-block';
            } else {
                // Hide the "Add" button on all others
                addButton.style.display = 'none';
            }
        });
    }

    // Function to create a new work experience block
    function createWorkExperience() {
        const experienceItem = document.createElement('div');
        experienceItem.classList.add('work-experience-item');
        experienceItem.innerHTML = `
            <h3>Work Experience</h3>
            <label>Job Title:</label>
            <input type="text" class="job-title" placeholder="Job Title">
            <label>Company:</label>
            <input type="text" class="company" placeholder="Company Name">
            <label>Start Date:</label>
            <input type="date" class="start-date" placeholder="Start Date">
            <label>End Date:</label>
            <input type="date" class="end-date" placeholder="End Date">
            <label>Current Job:</label>
            <input type="checkbox" class="current-job">
            <label>Job Description:</label>
            <textarea class="job-description" placeholder="Brief job description"></textarea>
            <button class="add-experience">Add Experience</button>
            <button class="remove-experience">Remove Experience</button>
        `;
        workExperienceContainer.appendChild(experienceItem);

        // Create a corresponding preview item
        const previewExperienceItem = document.createElement('div');
        previewWorkExperience.appendChild(previewExperienceItem);

        const jobTitle = experienceItem.querySelector('.job-title');
        const company = experienceItem.querySelector('.company');
        const startDate = experienceItem.querySelector('.start-date');
        const endDate = experienceItem.querySelector('.end-date');
        const currentJob = experienceItem.querySelector('.current-job');
        const jobDescription = experienceItem.querySelector('.job-description');

        function updateWorkPreview() {
            const employmentDates = currentJob.checked ? 'Present' :
                                    `${startDate.value} - ${endDate.value || 'End Date'}`;
            
            // Replace newlines with <br> for formatting, and handle bullet points if any
            const formattedDescription = jobDescription.value
                .replace(/•\s*/g, '<br>• ') // Handle bullet points
                .replace(/\n/g, '<br>');     // Replace newlines with <br>
        
            previewExperienceItem.innerHTML = `<div>
                <h4>${jobTitle.value || 'Job Title'} - ${company.value || 'Company'}</h4>
                <p>${employmentDates}</p>
                <p>${formattedDescription || 'Brief description of job responsibilities and achievements.'}</p>
            </div>`;
        }
        

        jobTitle.addEventListener('input', updateWorkPreview);
        company.addEventListener('input', updateWorkPreview);
        startDate.addEventListener('input', updateWorkPreview);
        endDate.addEventListener('input', updateWorkPreview);
        currentJob.addEventListener('change', updateWorkPreview);
        jobDescription.addEventListener('input', updateWorkPreview);

    // Add Experience Button
    const addExperienceBtn = experienceItem.querySelector('.add-experience');
    addExperienceBtn.addEventListener('click', createWorkExperience);

    // Remove Experience
    const removeExperienceBtn = experienceItem.querySelector('.remove-experience');
    removeExperienceBtn.addEventListener('click', function () {
        const experienceItems = workExperienceContainer.querySelectorAll('.work-experience-item');
        
        if (experienceItems.length > 1) {
            // Remove the experience block and its preview
            workExperienceContainer.removeChild(experienceItem);
            previewWorkExperience.removeChild(previewExperienceItem);
        } else {
            // Reset the fields if it's the only one
            jobTitle.value = '';
            company.value = '';
            startDate.value = '';
            endDate.value = '';
            currentJob.checked = false;
            jobDescription.value = '';
            updateWorkPreview(); // Clear the preview as well
        }

        // Update Add Buttons visibility
        updateAddButtons();
    });

    // Update Add Buttons visibility after creating new block
    updateAddButtons();

    }

    function updateEducationAddButtons() {
        const educationItems = educationContainer.querySelectorAll('.education-item');
        
        educationItems.forEach((item, index) => {
            const addButton = item.querySelector('.add-education');
            if (index === educationItems.length - 1) {
                // Show the "Add" button only on the last item
                addButton.style.display = 'inline-block';
            } else {
                // Hide the "Add" button on all others
                addButton.style.display = 'none';
            }
        });
    }
    
    // Modify createEducation function
    function createEducation() {
        const educationItem = document.createElement('div');
        educationItem.classList.add('education-item');
        educationItem.innerHTML = `
            <h3>Education</h3>
            <label>Degree:</label>
            <input type="text" class="degree" placeholder="Degree">
            <label>School Name:</label>
            <input type="text" class="school-name" placeholder="School Name">
            <label>Graduation Year:</label>
            <input type="month" class="graduation-date">
            <label>Achievements:</label>
            <textarea class="achievements" placeholder="Achievements (optional)"></textarea>
            <button class="add-education">Add Education</button>
            <button class="remove-education">Remove Education</button>
        `;
        educationContainer.appendChild(educationItem);
    
        // Create corresponding preview item
        const previewEducationItem = document.createElement('div');
        previewEducation.appendChild(previewEducationItem);
    
        const degree = educationItem.querySelector('.degree');
        const schoolName = educationItem.querySelector('.school-name');
        const graduationDate = educationItem.querySelector('.graduation-date');
        const achievements = educationItem.querySelector('.achievements');
    
        function updateEducationPreview() {
            const formattedAchievements = achievements.value
                .replace(/•\s*/g, '<br>• ')
                .replace(/\n/g, '<br>');
        
            previewEducationItem.innerHTML = `
                <h4>${degree.value || 'Degree'} - ${schoolName.value || 'School'}</h4>
                <p>Graduation: ${graduationDate.value || 'Year'}</p>
                <p>${formattedAchievements || ''}</p>
            `;
        }           
    
        degree.addEventListener('input', updateEducationPreview);
        schoolName.addEventListener('input', updateEducationPreview);
        graduationDate.addEventListener('input', updateEducationPreview);
        achievements.addEventListener('input', updateEducationPreview);
    
        // Add Education Button
        const addEducationBtn = educationItem.querySelector('.add-education');
        addEducationBtn.addEventListener('click', createEducation);
    
        // Remove Education Button
        const removeEducationBtn = educationItem.querySelector('.remove-education');
        removeEducationBtn.addEventListener('click', function () {
            const educationItems = educationContainer.querySelectorAll('.education-item');
            
            if (educationItems.length > 1) {
                // Remove the education item
                educationContainer.removeChild(educationItem);
                previewEducation.removeChild(previewEducationItem); // Remove corresponding preview item
            } else {
                // Reset the fields if it's the only one
                degree.value = '';
                schoolName.value = '';
                graduationDate.value = '';
                achievements.value = '';
                updateEducationPreview(); // Clear the preview as well
            }
    
            // Update "Add" button visibility
            updateEducationAddButtons();
        });
    
        // Update "Add" button visibility
        updateEducationAddButtons();
    }    

    function updateSkillAddButtons() {
        const skillItems = skillsContainer.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            const addButton = item.querySelector('.add-skill');
            if (index === skillItems.length - 1) {
                // Show the "Add" button only on the last item
                addButton.style.display = 'inline-block';
            } else {
                // Hide the "Add" button on all others
                addButton.style.display = 'none';
            }
        });
    }
    
    // Modify createSkill function
    function createSkill() {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <label>Skill:</label>
            <input type="text" class="skill" placeholder="Skill">
            <button class="add-skill">Add Skill</button>
            <button class="remove-skill">Remove Skill</button>
        `;
        skillsContainer.appendChild(skillItem);
    
        const skill = skillItem.querySelector('.skill');
    
        function updateSkillsPreview() {
            const skills = Array.from(skillsContainer.querySelectorAll('.skill'))
                                .map(input => input.value)
                                .filter(value => value);
    
            previewSkillsList.innerHTML = skills.join(', ') || 'Add your skills';
        }
    
        skill.addEventListener('input', updateSkillsPreview);
    
        // Add Skill Button
        const addSkillBtn = skillItem.querySelector('.add-skill');
        addSkillBtn.addEventListener('click', createSkill);
    
        // Remove Skill Button
        const removeSkillBtn = skillItem.querySelector('.remove-skill');
        removeSkillBtn.addEventListener('click', function () {
            const skillItems = skillsContainer.querySelectorAll('.skill-item');
            
            if (skillItems.length > 1) {
                // Remove the skill item
                skillsContainer.removeChild(skillItem);
            } else {
                // Reset the fields if it's the only one
                skill.value = '';
                updateSkillsPreview();
            }
    
            // Update "Add" button visibility
            updateSkillAddButtons();
        });
    
        // Update "Add" button visibility
        updateSkillAddButtons();
    }
    

    function updateProjectAddButtons() {
        const projectItems = projectsContainer.querySelectorAll('.project-item');
        
        projectItems.forEach((item, index) => {
            const addButton = item.querySelector('.add-project');
            if (index === projectItems.length - 1) {
                // Show the "Add" button only on the last item
                addButton.style.display = 'inline-block';
            } else {
                // Hide the "Add" button on all others
                addButton.style.display = 'none';
            }
        });
    }
    
    // Modify createProject function
    function createProject() {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        projectItem.innerHTML = `
            <h2>Project Experience</h2>
            <label>Project Title:</label>
            <input type="text" class="project-title" placeholder="Project Title">
            <label>Description:</label>
            <textarea class="project-description" placeholder="Project Description"></textarea>
            <button class="add-project">Add Project</button>
            <button class="remove-project">Remove Project</button>
        `;
        projectsContainer.appendChild(projectItem);
    
        // Create corresponding preview item
        const previewProjectItem = document.createElement('div');
        previewProjects.appendChild(previewProjectItem);
    
        const projectTitle = projectItem.querySelector('.project-title');
        const projectDescription = projectItem.querySelector('.project-description');
    
        function updateProjectsPreview() {
            const formattedProjectDesc = projectDescription.value
                .replace(/•\s*/g, '<br>• ')
                .replace(/\n/g, '<br>');

            previewProjectItem.innerHTML = `
                <h4>${projectTitle.value || 'Project Title'}</h4>
                <p>${form || 'Brief project description.'}</p>
            `;
        }
    
        projectTitle.addEventListener('input', updateProjectsPreview);
        projectDescription.addEventListener('input', updateProjectsPreview);
    
        // Add Project Button
        const addProjectBtn = projectItem.querySelector('.add-project');
        addProjectBtn.addEventListener('click', createProject);
    
        // Remove Project Button
        const removeProjectBtn = projectItem.querySelector('.remove-project');
        removeProjectBtn.addEventListener('click', function () {
            const projectItems = projectsContainer.querySelectorAll('.project-item');
            
            if (projectItems.length > 1) {
                // Remove the project item
                projectsContainer.removeChild(projectItem);
                previewProjects.removeChild(previewProjectItem); // Remove corresponding preview item
            } else {
                // Reset the fields if it's the only one
                projectTitle.value = '';
                projectDescription.value = '';
                updateProjectsPreview(); // Clear the preview as well
            }
    
            // Update "Add" button visibility
            updateProjectAddButtons();
        });
    
        // Update "Add" button visibility
        updateProjectAddButtons();
    }    

    // Initialize with one work experience, education, skill, and project item
    createWorkExperience();
    createEducation();
    createSkill();
    createProject();
});
