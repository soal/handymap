from handymap import handymap
import unittest

class HandymapTestCase(unittest.TestCase):

    def setUp(self):
        handymap.app.config['TESTING'] = True
        self.app = handymap.app.test_client()

    def tearDown(self):
        pass

if __name__ == '__main__':
    unittest.main()