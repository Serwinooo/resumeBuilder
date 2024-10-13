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

    // Function to update the live preview for contact info
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

    // Function to create a new work experience block
    function createWorkExperience() {
        const experienceItem = document.createElement('div');
        experienceItem.classList.add('work-experience-item');
        experienceItem.innerHTML = `
            <h2>Work Experience</h2>
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
            <button class="remove-experience">Remove Experience</button>
        `;
        workExperienceContainer.appendChild(experienceItem);

        // Update preview for the new work experience
        const jobTitle = experienceItem.querySelector('.job-title');
        const company = experienceItem.querySelector('.company');
        const startDate = experienceItem.querySelector('.start-date');
        const endDate = experienceItem.querySelector('.end-date');
        const currentJob = experienceItem.querySelector('.current-job');
        const jobDescription = experienceItem.querySelector('.job-description');

        function updateWorkPreview() {
            previewWorkExperience.innerHTML = ''; // Clear previous previews
            const employmentDates = currentJob.checked ? 'Present' : 
                                    `${startDate.value} - ${endDate.value || 'End Date'}`;

            const jobHTML = `<div>
                <h2>Work Experience</h2>
                <h3>${jobTitle.value || 'Job Title'} - ${company.value || 'Company'}</h3>
                <p>${employmentDates}</p>
                <p>${jobDescription.value || 'Brief description of job responsibilities and achievements.'}</p>
            </div>`;
            previewWorkExperience.innerHTML += jobHTML; // Add to preview
        }

        jobTitle.addEventListener('input', updateWorkPreview);
        company.addEventListener('input', updateWorkPreview);
        startDate.addEventListener('input', updateWorkPreview);
        endDate.addEventListener('input', updateWorkPreview);
        currentJob.addEventListener('change', updateWorkPreview);
        jobDescription.addEventListener('input', updateWorkPreview);

        // Remove Experience
        const removeExperienceBtn = experienceItem.querySelector('.remove-experience');
        removeExperienceBtn.addEventListener('click', function () {
            workExperienceContainer.removeChild(experienceItem);
            previewWorkExperience.innerHTML = ''; // Clear preview
        });
    }

    // Function to create a new education block
    function createEducation() {
        const educationItem = document.createElement('div');
        educationItem.classList.add('education-item');
        educationItem.innerHTML = `
            <h2>Education</h2>
            <label>Degree:</label>
            <input type="text" class="degree" placeholder="Degree">
            <label>School Name:</label>
            <input type="text" class="school-name" placeholder="School Name">
            <label>Graduation Year:</label>
            <input type="month" class="graduation-date">
            <label>Achievements:</label>
            <textarea class="achievements" placeholder="Achievements (optional)"></textarea>
            <button class="remove-education">Remove Education</button>
        `;
        educationContainer.appendChild(educationItem);

        // Update preview for the new education
        const degree = educationItem.querySelector('.degree');
        const schoolName = educationItem.querySelector('.school-name');
        const graduationDate = educationItem.querySelector('.graduation-date');
        const achievements = educationItem.querySelector('.achievements');

        function updateEducationPreview() {
            previewEducation.innerHTML = ''; // Clear previous previews
            const educationHTML = `<div>
                <h2>Education</h2>
                <h3>${degree.value || 'Degree'} - ${schoolName.value || 'School'}</h3>
                <p>Graduation: ${graduationDate.value || 'Year'}</p>
                <p>${achievements.value || 'Achievements or notable activities.'}</p>
            </div>`;
            previewEducation.innerHTML += educationHTML; // Add to preview
        }

        degree.addEventListener('input', updateEducationPreview);
        schoolName.addEventListener('input', updateEducationPreview);
        graduationDate.addEventListener('input', updateEducationPreview);
        achievements.addEventListener('input', updateEducationPreview);

        // Remove Education
        const removeEducationBtn = educationItem.querySelector('.remove-education');
        removeEducationBtn.addEventListener('click', function () {
            educationContainer.removeChild(educationItem);
            previewEducation.innerHTML = ''; // Clear preview
        });
    }

    // Function to add skill
    function createSkill() {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <label>Skill:</label>
            <input type="text" class="skill" placeholder="Skill">
            <button class="remove-skill">Remove Skill</button>
        `;
        skillsContainer.appendChild(skillItem);

        const skill = skillItem.querySelector('.skill');
        const removeSkillBtn = skillItem.querySelector('.remove-skill');

        function updateSkillsPreview() {
            previewSkillsList.innerHTML = ''; // Clear previous previews
            const skills = Array.from(skillsContainer.querySelectorAll('.skill'))
                                .map(input => input.value)
                                .filter(value => value);
            skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                previewSkillsList.appendChild(li);
            });
        }

        skill.addEventListener('input', updateSkillsPreview);

        // Remove Skill
        removeSkillBtn.addEventListener('click', function () {
            skillsContainer.removeChild(skillItem);
            updateSkillsPreview();
        });
    }

    // Function to create project
    function createProject() {
        const projectItem = document.createElement('div');
        projectItem.classList.add('project-item');
        projectItem.innerHTML = `
            <h2>Project Experience</h2>
            <label>Project Title:</label>
            <input type="text" class="project-title" placeholder="Project Title">
            <label>Description:</label>
            <textarea class="project-description" placeholder="Project Description"></textarea>
            <button class="remove-project">Remove Project</button>
        `;
        projectsContainer.appendChild(projectItem);

        const projectTitle = projectItem.querySelector('.project-title');
        const projectDescription = projectItem.querySelector('.project-description');

        function updateProjectsPreview() {
            previewProjects.innerHTML = ''; // Clear previous previews
            const projectsHTML = Array.from(projectsContainer.querySelectorAll('.project-item'))
                .map(item => {
                    const title = item.querySelector('.project-title').value || 'Untitled Project';
                    const desc = item.querySelector('.project-description').value || 'No description provided.';
                    return `<div>
                    <h2>Project Experience</h2>
                    <h3>${title}</h3><p>${desc}</p></div>`;
                }).join('');
            previewProjects.innerHTML = projectsHTML; // Add to preview
        }

        projectTitle.addEventListener('input', updateProjectsPreview);
        projectDescription.addEventListener('input', updateProjectsPreview);

        // Remove Project
        const removeProjectBtn = projectItem.querySelector('.remove-project');
        removeProjectBtn.addEventListener('click', function () {
            projectsContainer.removeChild(projectItem);
            updateProjectsPreview();
        });
    }

    // Event listeners for adding sections
    document.getElementById('add-experience').addEventListener('click', createWorkExperience);
    document.getElementById('add-education').addEventListener('click', createEducation);
    document.getElementById('add-skill').addEventListener('click', createSkill);
    document.getElementById('add-project').addEventListener('click', createProject);
});

           
