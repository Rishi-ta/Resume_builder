let experienceCount = 0;
let educationCount = 0;
let projectCount = 0;
let skillCount = 0;
let currentTemplate = 'modern';

// Template switching
document.querySelectorAll('.template-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.template-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        currentTemplate = this.dataset.template;
        
        const preview = document.getElementById('resumePreview');
        preview.className = `resume-preview resume-${currentTemplate}`;
    });
});

// Add Experience Entry
function addExperience() {
    experienceCount++;
    const container = document.getElementById('experienceContainer');
    const experienceHtml = `
        <div class="dynamic-entry" id="experience-${experienceCount}">
            <button type="button" class="remove-btn" onclick="removeEntry('experience-${experienceCount}')">×</button>
            <div class="form-row">
                <div class="form-group">
                    <label>Job Title *</label>
                    <input type="text" id="jobTitle-${experienceCount}" required onchange="updatePreview()">
                </div>
                <div class="form-group">
                    <label>Company *</label>
                    <input type="text" id="company-${experienceCount}" required onchange="updatePreview()">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" id="startDate-${experienceCount}" onchange="updatePreview()">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" id="endDate-${experienceCount}" onchange="updatePreview()">
                    <label style="margin-top: 10px;">
                        <input type="checkbox" id="current-${experienceCount}" onchange="toggleCurrentJob(${experienceCount})"> Currently working here
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="jobDescription-${experienceCount}" placeholder="Describe your responsibilities and achievements..." onchange="updatePreview()"></textarea>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', experienceHtml);
    updatePreview();
}

// Add Education Entry
function addEducation() {
    educationCount++;
    const container = document.getElementById('educationContainer');
    const educationHtml = `
        <div class="dynamic-entry" id="education-${educationCount}">
            <button type="button" class="remove-btn" onclick="removeEntry('education-${educationCount}')"></button>
            <div class="form-row">
                <div class="form-group">
                    <label>Degree *</label>
                    <input type="text" id="degree-${educationCount}" required onchange="updatePreview()">
                </div>
                <div class="form-group">
                    <label>Institution *</label>
                    <input type="text" id="institution-${educationCount}" required onchange="updatePreview()">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Graduation Year</label>
                    <input type="number" id="gradYear-${educationCount}" min="1950" max="2030" onchange="updatePreview()">
                </div>
                <div class="form-group">
                    <label>GPA (optional)</label>
                    <input type="text" id="gpa-${educationCount}" placeholder="3.8/4.0" onchange="updatePreview()">
                </div>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', educationHtml);
    updatePreview();
}

// Add Project Entry
function addProject() {
    projectCount++;
    const container = document.getElementById('projectsContainer');
    const projectHtml = `
        <div class="dynamic-entry" id="project-${projectCount}">
            <button type="button" class="remove-btn" onclick="removeEntry('project-${projectCount}')">×</button>
            <div class="form-row">
                <div class="form-group">
                    <label>Project Name *</label>
                    <input type="text" id="projectName-${projectCount}" required onchange="updatePreview()">
                </div>
                <div class="form-group">
                    <label>Technologies Used</label>
                    <input type="text" id="technologies-${projectCount}" placeholder="React, Node.js, MongoDB" onchange="updatePreview()">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Project URL</label>
                    <input type="url" id="projectUrl-${projectCount}" placeholder="https://github.com/username/project" onchange="updatePreview()">
                </div>
                <div class="form-group">
                    <label>Project Date</label>
                    <input type="month" id="projectDate-${projectCount}" onchange="updatePreview()">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="projectDescription-${projectCount}" placeholder="Describe the project and your contributions..." onchange="updatePreview()"></textarea>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', projectHtml);
    updatePreview();
}

// Add Skill Entry
function addSkill() {
    skillCount++;
    const container = document.getElementById('skillsContainer');
    const skillHtml = `
        <div class="skill-item" id="skill-${skillCount}">
            <input type="text" id="skillName-${skillCount}" placeholder="e.g., JavaScript" class="skill-name" onchange="updatePreview()">
            <div class="skill-level">
                <span class="star" onclick="setSkillLevel(${skillCount}, 1)">★</span>
                <span class="star" onclick="setSkillLevel(${skillCount}, 2)">★</span>
                <span class="star" onclick="setSkillLevel(${skillCount}, 3)">★</span>
                <span class="star" onclick="setSkillLevel(${skillCount}, 4)">★</span>
                <span class="star" onclick="setSkillLevel(${skillCount}, 5)">★</span>
            </div>
            <button type="button" class="remove-btn" onclick="removeEntry('skill-${skillCount}')" style="position: static; margin-left: 10px;">×</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', skillHtml);
    updatePreview();
}

// Set skill level
function setSkillLevel(skillId, level) {
    const stars = document.querySelectorAll(`#skill-${skillId} .star`);
    stars.forEach((star, index) => {
        if (index < level) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
    updatePreview();
}

// Remove entry
function removeEntry(entryId) {
    const entry = document.getElementById(entryId);
    if (entry) {
        entry.remove();
        updatePreview();
    }
}

// Toggle current job
function toggleCurrentJob(count) {
    const checkbox = document.getElementById(`current-${count}`);
    const endDateInput = document.getElementById(`endDate-${count}`);
    
    if (checkbox.checked) {
        endDateInput.disabled = true;
        endDateInput.value = '';
    } else {
        endDateInput.disabled = false;
    }
    updatePreview();
}

// Update preview
function updatePreview() {
    // Update personal information
    const fullName = document.getElementById('fullName').value || 'Your Name';
    const email = document.getElementById('email').value || 'email@example.com';
    const phone = document.getElementById('phone').value || '+1 (555) 123-4567';
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const summary = document.getElementById('summary').value;

    document.getElementById('previewName').textContent = fullName;
    document.getElementById('previewEmail').textContent = email;
    document.getElementById('previewPhone').textContent = phone;
    
    // LinkedIn
    const linkedinElement = document.getElementById('previewLinkedIn');
    if (linkedin) {
        linkedinElement.innerHTML = `<a href="${linkedin}" target="_blank">${linkedin}</a>`;
        linkedinElement.style.display = 'block';
    } else {
        linkedinElement.style.display = 'none';
    }
    
    // GitHub
    const githubElement = document.getElementById('previewGitHub');
    if (github) {
        githubElement.innerHTML = `<a href="${github}" target="_blank">${github}</a>`;
        githubElement.style.display = 'block';
    } else {
        githubElement.style.display = 'none';
    }
    
    // Summary
    const summarySection = document.getElementById('summarySection');
    const previewSummary = document.getElementById('previewSummary');
    if (summary) {
        previewSummary.textContent = summary;
        summarySection.style.display = 'block';
    } else {
        summarySection.style.display = 'none';
    }

    // Update Experience
    updateExperiencePreview();
    
    // Update Education
    updateEducationPreview();
    
    // Update Projects
    updateProjectsPreview();
    
    // Update Skills
    updateSkillsPreview();
}

function updateExperiencePreview() {
    const container = document.getElementById('previewExperience');
    const section = document.getElementById('experienceSection');
    let html = '';
    
    for (let i = 1; i <= experienceCount; i++) {
        const jobTitle = document.getElementById(`jobTitle-${i}`);
        const company = document.getElementById(`company-${i}`);
        const startDate = document.getElementById(`startDate-${i}`);
        const endDate = document.getElementById(`endDate-${i}`);
        const current = document.getElementById(`current-${i}`);
        const description = document.getElementById(`jobDescription-${i}`);
        
        if (jobTitle && company && jobTitle.value && company.value) {
            const startFormatted = startDate.value ? new Date(startDate.value + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '';
            const endFormatted = current && current.checked ? 'Present' : 
                (endDate.value ? new Date(endDate.value + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '');
            
            const duration = startFormatted && endFormatted ? `${startFormatted} - ${endFormatted}` : '';
            
            html += `
                <div class="resume-entry">
                    <div class="entry-header">
                        <div class="entry-title">${jobTitle.value}</div>
                        ${duration ? `<div class="entry-duration">${duration}</div>` : ''}
                    </div>
                    <div class="entry-subtitle">${company.value}</div>
                    ${description && description.value ? `<div>${description.value}</div>` : ''}
                </div>
            `;
        }
    }
    
    container.innerHTML = html;
    section.style.display = html ? 'block' : 'none';
}

function updateEducationPreview() {
    const container = document.getElementById('previewEducation');
    const section = document.getElementById('educationSection');
    let html = '';
    
    for (let i = 1; i <= educationCount; i++) {
        const degree = document.getElementById(`degree-${i}`);
        const institution = document.getElementById(`institution-${i}`);
        const gradYear = document.getElementById(`gradYear-${i}`);
        const gpa = document.getElementById(`gpa-${i}`);
        
        if (degree && institution && degree.value && institution.value) {
            html += `
                <div class="resume-entry">
                    <div class="entry-header">
                        <div class="entry-title">${degree.value}</div>
                        ${gradYear && gradYear.value ? `<div class="entry-duration">${gradYear.value}</div>` : ''}
                    </div>
                    <div class="entry-subtitle">${institution.value}</div>
                    ${gpa && gpa.value ? `<div>GPA: ${gpa.value}</div>` : ''}
                </div>
            `;
        }
    }
    
    container.innerHTML = html;
    section.style.display = html ? 'block' : 'none';
}

function updateProjectsPreview() {
    const container = document.getElementById('previewProjects');
    const section = document.getElementById('projectsSection');
    let html = '';
    
    for (let i = 1; i <= projectCount; i++) {
        const projectName = document.getElementById(`projectName-${i}`);
        const technologies = document.getElementById(`technologies-${i}`);
        const projectUrl = document.getElementById(`projectUrl-${i}`);
        const projectDate = document.getElementById(`projectDate-${i}`);
        const description = document.getElementById(`projectDescription-${i}`);
        
        if (projectName && projectName.value) {
            const dateFormatted = projectDate && projectDate.value ? 
                new Date(projectDate.value + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '';
            
            html += `
                <div class="resume-entry">
                    <div class="entry-header">
                        <div class="entry-title">${projectName.value}</div>
                        ${dateFormatted ? `<div class="entry-duration">${dateFormatted}</div>` : ''}
                    </div>
                    ${technologies && technologies.value ? `<div class="entry-subtitle">${technologies.value}</div>` : ''}
                    ${projectUrl && projectUrl.value ? `<div><a href="${projectUrl.value}" target="_blank">${projectUrl.value}</a></div>` : ''}
                    ${description && description.value ? `<div>${description.value}</div>` : ''}
                </div>
            `;
        }
    }
    
    container.innerHTML = html;
    section.style.display = html ? 'block' : 'none';
}

function updateSkillsPreview() {
    const container = document.getElementById('previewSkills');
    const section = document.getElementById('skillsSection');
    let html = '';
    
    for (let i = 1; i <= skillCount; i++) {
        const skillName = document.getElementById(`skillName-${i}`);
        const stars = document.querySelectorAll(`#skill-${i} .star.filled`);
        
        if (skillName && skillName.value) {
            const level = stars.length;
            let starsHtml = '';
            for (let j = 1; j <= 5; j++) {
                starsHtml += `<span class="skill-star ${j <= level ? '' : 'empty'}">★</span>`;
            }
            
            html += `
                <div class="skill-display">
                    <span>${skillName.value}</span>
                    <div class="skill-stars">${starsHtml}</div>
                </div>
            `;
        }
    }
    
    container.innerHTML = html;
    section.style.display = html ? 'block' : 'none';
}

// Generate PDF
function generatePDF() {
    if (!validateForm()) {
        alert('Please fill in all required fields before generating PDF.');
        return;
    }
    
    window.print();
}

// Clear form
function clearForm() {
    if (confirm('Are you sure you want to clear all form data?')) {
        document.querySelectorAll('input, textarea').forEach(input => {
            input.value = '';
            input.classList.remove('error');
        });
        
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        document.querySelectorAll('.dynamic-entry, .skill-item').forEach(entry => {
            entry.remove();
        });
        
        experienceCount = 0;
        educationCount = 0;
        projectCount = 0;
        skillCount = 0;
        
        updatePreview();
    }
}

// Form validation
function validateForm() {
    let isValid = true;
    const requiredFields = ['fullName', 'email', 'phone'];
    
    requiredFields.forEach(field => {
        const input = document.getElementById(field);
        const error = document.getElementById(field + 'Error');
        
        if (!input.value.trim()) {
            input.classList.add('error');
            error.textContent = 'This field is required';
            isValid = false;
        } else {
            input.classList.remove('error');
            error.textContent = '';
        }
    });

    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email.value && !emailPattern.test(email.value)) {
        email.classList.add('error');
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }

    return isValid;
}

// Real-time form updates
document.addEventListener('input', function(e) {
    if (e.target.matches('input, textarea')) {
        updatePreview();
    }
});

// Initialize with default content
window.addEventListener('load', function() {
    updatePreview();
});