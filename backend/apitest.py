import unittest
from app import app

class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_valid_login(self):
        response = self.app.post('/login', json={"username": "validuser", "password": "validpassword"})
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIn("_id", data)

    def test_invalid_login(self):
        response = self.app.post('/login', json={"username": "invaliduser", "password": "invalidpassword"})
        data = response.get_json()
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data, "Invalid username or password")

    def test_valid_registration(self):
        response = self.app.post('/register', json={
            "firstName": "John",
            "lastName": "Doe",
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpassword"
        })
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["username"], "newuser")

    def test_existing_username_registration(self):
        response = self.app.post('/register', json={
            "firstName": "Jane",
            "lastName": "Doe",
            "username": "validuser",
            "email": "janedoe@example.com",
            "password": "newpassword"
        })
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, "Username already taken. Please choose another username")

    def test_existing_email_registration(self):
        response = self.app.post('/register', json={
            "firstName": "Jane",
            "lastName": "Doe",
            "username": "janedoe",
            "email": "validuser@example.com",
            "password": "newpassword"
        })
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, "Email is already in use. Please choose another email")

    def test_get_all_quiz_sets(self):
        response = self.app.get('/quizsets')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertTrue(isinstance(data, list))

    def test_get_valid_quiz_set_by_id(self):
        response = self.app.get('/quizset/valid_quiz_id')
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertIn("_id", data)

    def test_get_invalid_quiz_set_by_id(self):
        response = self.app.get('/quizset/invalid_quiz_id')
        data = response.get_json()
        self.assertEqual(response.status_code, 400)
        self.assertEqual(data, "Not a valid Quiz Id")

    def test_create_quiz_set(self):
        quiz_data = {
            "title": "New Quiz",
            "questions": [
                {"question": "Q1", "answer": "A1"},
                {"question": "Q2", "answer": "A2"}
            ]
        }
        response = self.app.post('/createquizset', json=quiz_data)
        data = response.get_json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data["title"], "New Quiz")

    def test_populate_database(self):
        response = self.app.get('/populate')
        data = response.get_json()
        self.assertEqual(response.status_code, 201)
        self.assertEqual(data["message"], "populated")

if __name__ == '__main__':
    unittest.main()

