const homePage =
    document.getElementById("homePage");
const registerPage =
    document.getElementById("registerPage");
const loginPage =
    document.getElementById("loginPage");
const dashboardPage =
    document.getElementById("dashboardPage");

function showHomePage() 
{
    homePage.style.display = "block";
    registerPage.style.display = "none";
    loginPage.style.display = "none";
    dashboardPage.style.display = "none";

}

function showRegisterPage() 
{
    homePage.style.display = "none";
    registerPage.style.display = "block";
    loginPage.style.display = "none";
    dashboardPage.style.display = "none";
}

function showLoginPage() 
{
    homePage.style.display = "none";
    registerPage.style.display = "none";
    loginPage.style.display = "block";
    dashboardPage.style.display = "none";
}

function showDashboardPage() 
{
    homePage.style.display = "none";
    registerPage.style.display = "none";
    loginPage.style.display = "none";
    dashboardPage.style.display = "block";
}

if (localStorage.getItem("userId")) 
    {
    showDashboardPage();
    setupDashboard();
    getComplaints();
     }

else 
    {
    showHomePage();
    }

document
    .getElementById("navHomeButton")
    .addEventListener("click", function ()
    {
        showHomePage();

    });

document
    .getElementById("navLoginButton")
    .addEventListener("click", function () 
    {
        showLoginPage();
    });

document
    .getElementById("navRegisterButton")
    .addEventListener("click", function () 
    {
        showRegisterPage();
    });

document
    .getElementById("heroLoginButton")
    .addEventListener("click", function () 
    {
        showLoginPage();
    });

document
    .getElementById("heroRegisterButton")
    .addEventListener("click", function () 
    {
        showRegisterPage();
    });

document
    .getElementById("ctaRegisterButton")
    .addEventListener("click", function () 
    {
        showRegisterPage();
    });

document
    .getElementById("goToLoginButton")
    .addEventListener("click", function () 
    {
        showLoginPage();
    });

document
    .getElementById("registerHomeButton")
    .addEventListener("click", function () 
    {
        showHomePage();
    });

document
    .getElementById("goToRegisterButton")
    .addEventListener("click", function ()
     {
        showRegisterPage();
    });

document
    .getElementById("loginHomeButton")
    .addEventListener("click", function () 
    {
        showHomePage();
    });

const registerForm =
    document.getElementById("registerForm");
const registerMessage =
    document.getElementById("registerMessage");

registerForm.addEventListener(
    "submit",
    async function (event) 
    {
        event.preventDefault();
        const user = 
        {
            name:
                document.getElementById("name").value,
            email:
                document.getElementById("email").value,
            password:
                document.getElementById("password").value,
            role:
                document.getElementById("role").value
        };

        try 
        {
            const response =
                await fetch("/register", 
                    {
                    method: "POST",
                    headers: 
                    {
                        "Content-Type":
                        "application/json"
                    },
                    body:
                        JSON.stringify(user)
                });

            const data =
                await response.json();

            if (response.ok) 
                {
                registerMessage.textContent =
                    "Account created successfully!";

                registerForm.reset();

                setTimeout(function () 
                {
                    showLoginPage();
                }, 700);
            } 
            else 
                {
                registerMessage.textContent =
                    data.message ||
                    "Error creating account.";
                }
        }
        catch (error) 
        {
            console.log
            (
                "Registration error:",
                error
            );

            registerMessage.textContent =
                "Server error.";
        }
    }
);

const loginForm =
    document.getElementById("loginForm");
const loginMessage =
    document.getElementById("loginMessage");
loginForm.addEventListener(
    "submit",
    async function (event) 
    {
        event.preventDefault();
        const loginData = 
        {
            email:
                document.getElementById("loginEmail").value,
            password:
                document.getElementById("loginPassword").value
        };

        try 
        {
            const response =
                await fetch("/login", 
                {
                    method: "POST",
                    headers: 
                    {
                        "Content-Type":
                        "application/json"
                    },
                    body:
                        JSON.stringify(loginData)
                });

            const data =
                await response.json();
            if (response.ok) 
                {
                const user =
                    data.user;

                localStorage.setItem
                (
                    "userId",
                    user._id
                );

                localStorage.setItem
                (
                    "userRole",
                    user.role
                );

                localStorage.setItem
                (
                    "userName",
                    user.name
                );

                loginMessage.textContent =
                    "Login successful!";

                showDashboardPage();
                setupDashboard();
                getComplaints();

            } 
            else 
                {
                loginMessage.textContent =
                    data.message ||
                    "Login failed.";
            
                }
        }
        catch (error) 
        {

            console.log
            (
                "Login error:",
                error
            );

            loginMessage.textContent =
                "Server error.";
        }
    }
);

function setupDashboard() 
{
    const userName =
        localStorage.getItem("userName");
    const userRole =
        localStorage.getItem("userRole");
    const welcomeMessage =
        document.getElementById
        (
            "welcomeMessage"
        );
    const complaintsHeading =
    document.querySelector
    (
        "#dashboardPage h2:nth-of-type(2)"
    );
   if (userRole === "admin") 
    {
    welcomeMessage.textContent =
        "Welcome " +
        userName +
        "! Admin Dashboard";
          complaintsHeading.textContent =
    "Manage Complaints";
    document
        .getElementById("adminStats")
        .style.display = "grid";
    document
        .getElementById("complaintForm")
        .style.display = "none";

}
 else 
    {

    welcomeMessage.textContent =
        "Welcome " +
        userName +
        "! Student Dashboard";

          complaintsHeading.textContent =
    "My Complaints";

    document
        .getElementById("adminStats")
        .style.display = "none";

    document
        .getElementById("complaintForm")
        .style.display = "block";
  
}
}

const complaintForm =
    document.getElementById
    (
        "complaintForm"
    );

const message =
    document.getElementById("message");

complaintForm.addEventListener
(
    "submit",
    async function (event) 
    {
        event.preventDefault();

        const complaint = 
        {

            title:
                document.getElementById("title").value,
            description:
                document.getElementById("description").value,
            category:
                document.getElementById("category").value,
            location:
                document.getElementById("location").value,
            priority:
                document.getElementById("priority").value,
            userId:
                localStorage.getItem("userId")
        };

        try 
        {
            const response =
                await fetch("/complaints", 
                    {
                    method: "POST",
                    headers: 
                    {
                        "Content-Type":
                        "application/json"
                    },
                    body:
                        JSON.stringify(complaint)
                });

            const data =
                await response.json();

            if (response.ok) 
                {

                message.textContent =
                    "Complaint submitted successfully!";
                complaintForm.reset();

                getComplaints();

                }
             else 
                {

                message.textContent =
                    data.message ||
                    "Error submitting complaint.";

                }
        }
        catch (error) 
        {
            console.log
            (
                "Error submitting complaint:",
                error
            );
            message.textContent =
                "Server error.";
        }
    }
);

async function getComplaints() 
{

    try 
    {
        const userId = localStorage.getItem("userId");
        const userRole = localStorage.getItem("userRole");

        if (!userId) 
        {
            return;
        }
        let response;

        if (userRole === "admin") 
            {
            response = await fetch("/complaints");
            }

        else 
        {
            response = await fetch
            (
                `/complaints/user/${userId}`
            );
        }

        if (!response.ok) 
        {
            throw new Error
            (
                "Failed to load complaints: " +
                response.status
            );

        }

        const complaints = await response.json();
        console.log("Complaints received:", complaints);

        const total = complaints.length;
        const pending = complaints.filter
        (
            complaint => complaint.status === "Pending"
        )
        .length;

        const inProgress = complaints.filter
        (
            complaint => complaint.status === "In Progress"
        )
        .length;

        const resolved = complaints.filter
        (
            complaint => complaint.status === "Resolved"
        )
        .length;

        document.getElementById
        (
            "totalComplaints"
        ).textContent = total;

        document.getElementById
        (
            "pendingComplaints"
        ).textContent = pending;

        document.getElementById
        (
            "progressComplaints"
        ).textContent = inProgress;

        document.getElementById
        (
            "resolvedComplaints"
        ).textContent = resolved;

        const searchText =
            document.getElementById
            (
                "searchInput"
            ).value.toLowerCase();

        const selectedStatus =
            document.getElementById
            (
                "statusFilter"
            ).value;

        const filteredComplaints =
            complaints.filter(function (complaint) 
            {

                const title =
                    (complaint.title || "")
                    .toLowerCase();
                const description =
                    (complaint.description || "")
                    .toLowerCase();
                const location =
                    (complaint.location || "")
                    .toLowerCase();
                const category =
                    (complaint.category || "")
                    .toLowerCase();

                const matchesSearch =
                    title.includes(searchText) ||
                    description.includes(searchText) ||
                    location.includes(searchText) ||
                    category.includes(searchText);

                const matchesStatus =
                    selectedStatus === "All" ||
                    complaint.status === selectedStatus;

                return matchesSearch && matchesStatus;

            });

        const complaintsList =
            document.getElementById
            (
                "complaintsList"
            );

        complaintsList.innerHTML = "";

        if (filteredComplaints.length === 0) 
        {

            complaintsList.innerHTML = `
                <div class="complaint-card">
                    <h3>
                        No Complaints Found
                    </h3>

                    <p>
                        There are no complaints to display.
                    </p>
                </div>
            `;
            return;
        }

        filteredComplaints.forEach
        (
            function (complaint) 
            {

                const complaintCard =
                    document.createElement("div");
                complaintCard.className =
                    "complaint-card";

                complaintCard.innerHTML = `
                    <div class="complaint-header">
                        <h3>
                            ${complaint.title}
                        </h3>
                    </div>

                    <p>
                        ${complaint.description}
                    </p>

                    <div class="complaint-details">
                        <p>
                            <strong>Category:</strong>
                            ${complaint.category}
                        </p>

                        <p>
                            <strong>Location:</strong>
                            ${complaint.location}
                        </p>

                        <p>
                            <strong>Priority:</strong>
                            ${complaint.priority}
                        </p>

                        <p>
                            <strong>Status:</strong>
                                ${complaint.status}
                        </p>
                    </div>

                    ${
                        userRole === "admin"
                        ?
                        `
                        <div class="admin-actions">
                            <button
                                type="button"
                                onclick="updateComplaint
                                (
                                    '${complaint._id}',
                                    'In Progress'
                                )">
                                Mark In Progress
                            </button>

                            <button
                                type="button"
                                onclick="updateComplaint
                                (
                                    '${complaint._id}',
                                    'Resolved'
                                )">
                                Mark Resolved
                            </button>


                            <button
                                type="button"
                                onclick="deleteComplaint
                                (
                                    '${complaint._id}'
                                )">
                                Delete
                            </button>
                        </div>
                        `
                        :
                        ""
                    }
                `;

                complaintsList.appendChild
                (
                    complaintCard
                );
            }
        );
    }
    catch (error) 
    {

        console.error
        (
            "Error loading complaints:",
            error
        );
    }
}

document
    .getElementById("searchInput")
    .addEventListener(
        "input",
        function () {
            getComplaints();
        }
    );

document
    .getElementById("statusFilter")
    .addEventListener(
        "change",
        function () {
            getComplaints();
        }
    );

async function updateComplaint
(
    complaintId,
    newStatus
) 
{

    try 
    {
        const response =
            await fetch
            (
                `/complaints/${complaintId}`,
                {
                    method: "PUT",
                    headers: 
                    {
                        "Content-Type":
                        "application/json"
                    },
                    body:
                        JSON.stringify
                        ({
                            status:
                                newStatus
                        })
                }
            );

        const data =
            await response.json();


        if (response.ok) 
            {

            console.log
            (
                "Complaint updated:",
                data
            );

            getComplaints();
        } 
        else
        {

            console.log
            (
                "Error updating complaint:",
                data
            );
        }
    }

    catch (error) 
    {
        console.log
        (
            "Error updating complaint:",
            error
        );
    }
}

async function deleteComplaint
(
    complaintId
)
 {
    try 
    {
        const response =
            await fetch
            (
                `/complaints/${complaintId}`,
                {
                    method: "DELETE"
                }
            );

        const data =
            await response.json();

        if (response.ok)
        {
            console.log
            (
                data.message
            );

            getComplaints();
        } 
        else 
        {
            console.log
            (
                data.message
            );
        }
    }

    catch (error) 
    {
        console.log
        (
            "Error deleting complaint:",
            error
        );
    }
}

document
    .getElementById("logoutButton")
    .addEventListener
    (
        "click",
        function () 
        {

            localStorage.removeItem
            (
                "userId"
            );

            localStorage.removeItem
            (
                "userRole"
            );

            localStorage.removeItem
            (
                "userName"
            );

            showHomePage();
        }
    );