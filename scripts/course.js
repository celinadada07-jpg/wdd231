const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Programming Building Blocks",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        completed: false
    }
];

const courseContainer = document.querySelector("#course-container");
const totalCredits = document.querySelector("#total-credits");

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const courseCard = document.createElement("div");

        courseCard.classList.add("course-card");

        if (course.completed) {
            courseCard.classList.add("completed");
        } else {
            courseCard.classList.add("incomplete");
        }

        courseCard.innerHTML = `
            <span>${course.subject} ${course.number}</span>
            <br>
            ${course.title}
        `;

        courseContainer.appendChild(courseCard);
    });

    const credits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent = credits;
}

function filterCourses(type) {

    let filteredCourses;

    if (type === "WDD") {
        filteredCourses = courses.filter(course => course.subject === "WDD");
    } 
    else if (type === "CSE") {
        filteredCourses = courses.filter(course => course.subject === "CSE");
    } 
    else {
        filteredCourses = courses;
    }

    displayCourses(filteredCourses);
}

document.querySelector("#all-courses").addEventListener("click", () => {
    filterCourses("ALL");
});

document.querySelector("#wdd-courses").addEventListener("click", () => {
    filterCourses("WDD");
});

document.querySelector("#cse-courses").addEventListener("click", () => {
    filterCourses("CSE");
});

displayCourses(courses);