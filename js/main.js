'use strict';

const findJobBtn = document.querySelector('.button-container');
let howManyJobs = document.getElementById('show-jobster');

findJobBtn.addEventListener('click', () => {
	let filterJob = document.getElementById('filter-jobs').value;
	getJobs().then((jobs) => {
		let filteredJobs = filtersJob(jobs, filterJob);
		showJobs(filteredJobs);
		for (let i = 0; i < filteredJobs.length; i++) {
			let jim = (i += 1);
			if (i === filteredJobs.length) {
				return (howManyJobs.innerHTML = `Showing ${jim} Jobs`);
			}
		}
	});
});

function filtersJob(jobs, searchText) {
	if (searchText) {
		let filteredJobs = jobs.filter((job) => {
			if (
				job.roleName.toLowerCase().includes(searchText) ||
				job.type.toLowerCase().includes(searchText) ||
				job.company.toLowerCase().includes(searchText) ||
				job.requirements.content.toLowerCase().includes(searchText)
			) {
				return true;
			}
		});
		return filteredJobs;
	} else {
		return jobs;
	}
}

function getJobs() {
	return fetch('data.json').then((res) => res.json()).then((data) => {
		return data;
	});
}

function showJobs(jobs) {
	console.log('this is the jobs', jobs);
	let jobCont = document.querySelector('.job-list-container');
	let jobsHTML = '';
	jobs.forEach((job) => {
		jobsHTML += `
        <div div class="job-card-container">
          <div class="logo-container">
            <img src=${job.logo} alt="">
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div class="title-container">
            <span>${job.roleName}</span>
          </div>
          <div class="description-container">
            <span>${job.requirements.content}</span>
          </div>
          <div class="buttons">
            <div class="button apply-now">Apply Now</div>
            <div class="button message">Message</div>
          </div>
        </div>
        `;
	});
	jobCont.innerHTML = jobsHTML;
}

getJobs().then((data) => {
	showJobs(data);
});
