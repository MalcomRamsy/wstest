// Constructor function for a match
function Match(date, startTime, stopTime, homeTeam, score, awayTeam, scorers) {
    this.date = date;
    this.startTime = startTime;
    this.stopTime = stopTime;
    this.homeTeam = homeTeam;
    this.score = score;
    this.awayTeam = awayTeam;
    this.scorers = scorers;
}

// Function to display table fixtures
function displayTableFixtures() {
    // Get the current date
    var currentDate = new Date();

    // Select the table body
    var tableBody = document.querySelector('table tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Fetch fixtures for the current day
    var fixturesForToday = getFixturesForDate(currentDate);

    // Sort fixtures by date in descending order
    fixturesForToday.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    // Populate the table with fixtures for the current day
    fixturesForToday.forEach(function(match, index) {
        var row = document.createElement('tr');

        // Apply light grey color to rows with dates before the current day
        if (new Date(match.date).toDateString() === currentDate.toDateString()) {
            row.style.backgroundColor = 'lightblue';

            // Check if match is ongoing
            var startTime = new Date(match.date + 'T' + match.startTime);
            var stopTime = new Date(match.date + 'T' + match.stopTime);
            var currentTime = new Date();

            // Add an indicator for the current date
            var indicatorCell = document.createElement('td');
            if (currentTime >= startTime && currentTime <= stopTime) {
                indicatorCell.innerHTML = '<div style="width: 8px; height: 8px; border-radius: 50%; background-color: red; display: inline-block; margin-right: 8px; margin-top: 3px;"></div>';
            } else if (currentTime < startTime) {
                indicatorCell.innerHTML = '<div style="width: 8px; height: 8px; border-radius: 50%; background-color: green; display: inline-block; margin-right: 8px; margin-top: 3px;"></div>';
            } else {
                indicatorCell.innerHTML = '<div style="width: 8px; height: 8px; border-radius: 50%; background-color: gray; display: inline-block; margin-right: 8px; margin-top: 3px;"></div>';
            }
            row.appendChild(indicatorCell);
        } else if (new Date(match.date) < currentDate) {
            row.style.backgroundColor = 'lightgrey';
        }

        // Populate table cells with match details
        if (new Date(match.date).toDateString() !== currentDate.toDateString()) {
            var dateCell = document.createElement('td');
            dateCell.textContent = new Date(match.date).toDateString();
            row.appendChild(dateCell);
        }
        
        row.innerHTML += `
            <td>${match.homeTeam}</td>
            <td>${match.score}</td>
            <td>${match.awayTeam}</td>
            <td>${match.scorers}</td>
        `;

        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

function displayNonTableFixtures() {
    // Get the current date
    var currentDate = new Date();

    // Select the fixtures container
    var fixturesContainer = document.getElementById('fixturesContainer');

    // Clear existing fixtures
    fixturesContainer.innerHTML = '';

    // Fetch fixtures for the current day
    var fixturesForToday = getFixturesForDate(currentDate);

    // Sort fixtures by date in descending order
    fixturesForToday.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    // Loop through fixtures and create HTML elements
    fixturesForToday.forEach(function(match) {
        var fixtureElement = document.createElement('div');
        fixtureElement.classList.add('fixture');

        // Apply styles based on current date
        if (new Date(match.date).toDateString() === currentDate.toDateString()) {
            fixtureElement.style.backgroundColor = 'lightblue'; // Light blue for current date

            // Check if match is ongoing
            var startTime = new Date(match.date + 'T' + match.startTime);
            var stopTime = new Date(match.date + 'T' + match.stopTime);
            var currentTime = new Date();

            // Add indicator for the current date
            var indicatorDiv = document.createElement('div');
            indicatorDiv.style.width = '8px';
            indicatorDiv.style.height = '8px';
            indicatorDiv.style.borderRadius = '50%';
            indicatorDiv.style.display = 'inline-block';
            indicatorDiv.style.marginRight = '8px';
            indicatorDiv.style.marginTop = '3px';

            if (currentTime >= startTime && currentTime <= stopTime) {
                indicatorDiv.style.backgroundColor = 'red'; // Red during match duration
            } else if (currentTime < startTime) {
                indicatorDiv.style.backgroundColor = 'green'; // Green before match starts
            } else {
                indicatorDiv.style.backgroundColor = 'gray'; // Gray after match ends
            }

            fixtureElement.appendChild(indicatorDiv);
        } else if (new Date(match.date) < currentDate) {
            fixtureElement.style.backgroundColor = 'lightgrey'; // Light grey for past dates
        }

        // Display fixture details
        fixtureElement.innerHTML += `
            <h2>${match.homeTeam} vs ${match.awayTeam}</h2>
            <p>Date: ${match.date}</p>
            <p>Start Time: ${match.startTime}</p>
  
            <p>Score: ${match.score}</p>
            <p>Scorers: ${match.scorers}</p>
        `;

        // Append fixture element to container
        fixturesContainer.appendChild(fixtureElement);
    });
}


// Function to get fixtures for a specific date
function getFixturesForDate(date) {
    // Here you would fetch fixtures data for the provided date from your backend or another data source
    // For demonstration purposes, we'll return some sample data

    // Sample fixtures data for demonstration
    var sampleFixtures = [

        // Add more matches for future dates
        new Match('2024-03-23', '10:00', '13:00', 'Home Boys FC', ' - ', 'Iwemba Lions FC', 'Not yet started (15\')'),
        new Match('2024-03-26', '16:00', '19:00', 'Iwemba Lions FC', ' - ', 'Medical FC', 'Not yet started'),
        new Match('2024-03-31', '16:00', '19:00', 'Iwemba Lions FC', ' - ', 'Flamingo FC', 'Not yet started'),
        new Match('2024-04-4', '16:00', '19:00', 'Buluguyi FC', ' - ', 'Iwemba Lion FC', 'Not yet started'),
        new Match('2024-04-6', '16:00', '19:00', 'Nakigunju FC/ Buwuni TC FC', ' - ', 'Iwemba Lions FC', 'Team not confirmed'),
        new Match('2024-04-11', '16:00', '19:00', 'Iwemba Lions FC', ' - ', 'Kiwongolo Blacks Power FC', 'Not yet started'),
        new Match('2024-04-14', '16:00', '19:00', 'Butyabule FC', ' - ', 'Iwemba Lion FC', 'Not yet started')
    ];

    // Filter out fixtures for future dates
    var pastFixtures = sampleFixtures.filter(function(match) {
        return new Date(match.date) <= date;
    });

    return pastFixtures;
}

// Function to check for and display current matches as notifications
function displayMatchNotification() {
    // Get the current date
    var currentDate = new Date();

    // Fetch fixtures for the current day
    var fixturesForToday = getFixturesForDate(currentDate);

    // Filter out ongoing matches
    var ongoingMatches = fixturesForToday.filter(function(match) {
        var matchDate = new Date(match.date);
        return matchDate.getDate() === currentDate.getDate() && matchDate.getMonth() === currentDate.getMonth() && matchDate.getFullYear() === currentDate.getFullYear();
    });

    // Display notifications for ongoing matches
    ongoingMatches.forEach(function(match) {
        // Check if match is ongoing
        var startTime = new Date(match.date + 'T' + match.startTime);
        var stopTime = new Date(match.date + 'T' + match.stopTime);
        var currentTime = new Date();

        if (currentTime >= startTime && currentTime <= stopTime) {
            // Create a notification
            var notification = new Notification('Current Match: ' + match.homeTeam + ' vs ' + match.awayTeam, {
                body: 'Date: ' + match.date + '\nStart Time: ' + match.startTime + match.score ,
                icon: 'images/Iwemba Lions Logo.jpg' // Path to your logo image
            });

            // Automatically close the notification after less than 5 minutes
            setTimeout(function() {
                notification.close();
            }, 200000); // 200000 milliseconds = 10 minutes
        }
    });
}

// Call the appropriate display function based on the HTML page
window.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('table tbody')) {
        displayTableFixtures(); // If it's the fixture.html page
        displayMatchNotification(); // Display notifications
    } else if (document.getElementById('fixturesContainer')) {
        displayNonTableFixtures(); // If it's the index.html page
    }
});
