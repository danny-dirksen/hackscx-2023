let plans, workouts;

function planCard(plan, workouts) {
  const { planId, name, description, workoutIds } = plan;
  const planWorkouts = workoutIds.map(workoutId => workouts[workoutId]);
  return `
    <div class="plan-card">
      <img src="/data/workout-images/${planId}.jpg" alt="${plan.name}" />
      <div class="plan-card-content">
        <div class="plan-card-title">${name}</div>
        <div>${description}</div>
        <div>
          <em>Sequence:</em>
          <ul>
            ${planWorkouts.map(workout => `<li>${workout.name}</li>`).join("")}
          </ul>
        </div>
        <div class="plan-card-actions">
          <a href="/html/workout.html?plan=${planId}" class="btn btn-primary">Start Workout</a>
        </div>
      </div>
    </div>
  `;
}

const planCardHolderEl = document.querySelector(".plan-card-holder");

async function fetchPlans() {
  const plansResp = await fetch("/data/plans.json");
  plans = await plansResp.json();
  const workoutsResp = await fetch("/data/workouts.json");
  workouts = await workoutsResp.json();
  planCardHolderEl.innerHTML = plans.map(plan => planCard(plan, workouts)).join("");
}

fetchPlans();