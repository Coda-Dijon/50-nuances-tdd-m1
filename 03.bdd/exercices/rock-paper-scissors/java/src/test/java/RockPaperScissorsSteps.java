import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;

public class RockPaperScissorsSteps {
    @Given("^Player (\\d+) chooses (.*)$")
    public void playerChooses(int player, String choice) {
    }

    @When("^they play$")
    public void theyPlay() {

    }

    @Then("^the result should be (.*) because (.*)$")
    public void theResultShouldBe(String expectedWinner, String expectedReason) {

    }
}