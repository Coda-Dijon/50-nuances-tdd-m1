Feature: Rock Paper Scissors Game

  Scenario: Player 1 wins with 🪨 over ✂️
    Given Player 1 chooses 🪨
    And Player 2 chooses ✂️
    When they play
    Then the result should be Player 1 because rock crushes scissors