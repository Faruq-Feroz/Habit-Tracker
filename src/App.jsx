import { useState } from 'react';
import { Container, Row, Col, Button, Form, ProgressBar, Card } from 'react-bootstrap';

function App() {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState(7);
  const [darkTheme, setDarkTheme] = useState(false);

  const addHabit = () => {
    if (habitName.trim()) {
      setHabits([...habits, { name: habitName, frequency, progress: 0, checkedDays: Array(frequency).fill(false) }]);
      setHabitName('');
      setFrequency(7);
    }
  };

  const toggleCompletion = (habitIndex, dayIndex) => {
    const updatedHabits = habits.map((habit, index) => {
      if (index === habitIndex) {
        const newCheckedDays = habit.checkedDays.map((checked, idx) =>
          idx === dayIndex ? !checked : checked
        );
        const newProgress = (newCheckedDays.filter(Boolean).length / habit.frequency) * 100;
        return { ...habit, checkedDays: newCheckedDays, progress: newProgress };
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  const deleteHabit = (habitIndex) => {
    setHabits(habits.filter((_, index) => index !== habitIndex));
  };

  const handleToggleTheme = () => {
    setDarkTheme(!darkTheme);
    document.body.classList.toggle('dark-theme', !darkTheme);
  };

  return (
    <Container className="my-5">
      {/* Theme Toggle Switch */}
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" checked={darkTheme} onChange={handleToggleTheme} />
          <span className="slider round"></span>
        </label>
        <span>{darkTheme ? 'Dark Mode' : 'Light Mode'}</span>
      </div>

      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <h1 className="text-center">Habit Tracker</h1>
          <Form>
            <Row className="align-items-center">
              <Col md={5}>
                <Form.Group controlId="habitName ">
                  <Form.Label>Habit Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={habitName}
                    onChange={(e) => setHabitName(e.target.value)}
                    placeholder="Enter habit name"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="frequency">
                  <Form.Label>Frequency</Form.Label>
                  <Form.Control
                    as="select"
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                  >
                    {[7, 14, 30].map((day) => (
                      <option key={day} value={day}>
                        {day} Days
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Button variant="primary" onClick={addHabit} className="mt-2">
                  Add Habit
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Row>
        {habits.map((habit, habitIndex) => (
          <Col md={6} key={habitIndex} className="mb-4">
            <Card className="habit-card">
              <Card.Body>
                <Card.Title>{habit.name}</Card.Title>
                <ProgressBar now={habit.progress} label={`${Math.round(habit.progress)}%`} />
                <div className="mt-3 d-flex justify-content-between">
                  {habit.checkedDays.map((checked, dayIndex) => (
                    <Button
                      key={dayIndex}
                      variant={checked ? 'success' : 'outline-secondary'}
                      className="day-btn"
                      onClick={() => toggleCompletion(habitIndex, dayIndex)}
                    >
                      {dayIndex + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="danger"
                  onClick={() => deleteHabit(habitIndex)}
                  className="mt-3"
                >
                  Delete Habit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
