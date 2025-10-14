#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Application
Tests all portfolio API endpoints with proper data validation
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any

# Get backend URL from environment
BACKEND_URL = "https://code-folio-55.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, message: str, details: Dict[Any, Any] = None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "details": details or {}
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if details and not success:
            print(f"   Details: {json.dumps(details, indent=2)}")
    
    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "version" in data:
                    self.log_test("Health Check", True, "API is running successfully", {
                        "status_code": response.status_code,
                        "response": data
                    })
                    return True
                else:
                    self.log_test("Health Check", False, "Response missing required fields", {
                        "status_code": response.status_code,
                        "response": data
                    })
            else:
                self.log_test("Health Check", False, f"Unexpected status code: {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
        except Exception as e:
            self.log_test("Health Check", False, f"Request failed: {str(e)}")
        
        return False
    
    def test_get_portfolio(self):
        """Test GET /api/portfolio - Get complete portfolio data"""
        try:
            response = self.session.get(f"{self.base_url}/portfolio")
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required sections
                required_sections = ["personal_info", "skills", "experience", "education", "projects", "testimonials", "achievements"]
                missing_sections = [section for section in required_sections if section not in data]
                
                if not missing_sections:
                    self.log_test("Get Portfolio", True, "Portfolio data retrieved successfully", {
                        "status_code": response.status_code,
                        "sections_count": len(data),
                        "sections": list(data.keys())
                    })
                    return data
                else:
                    self.log_test("Get Portfolio", False, f"Missing required sections: {missing_sections}", {
                        "status_code": response.status_code,
                        "available_sections": list(data.keys()),
                        "missing_sections": missing_sections
                    })
            else:
                self.log_test("Get Portfolio", False, f"Unexpected status code: {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
        except Exception as e:
            self.log_test("Get Portfolio", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_get_projects(self):
        """Test GET /api/portfolio/projects - Get projects"""
        try:
            response = self.session.get(f"{self.base_url}/portfolio/projects")
            
            if response.status_code == 200:
                projects = response.json()
                
                if isinstance(projects, list) and len(projects) == 4:
                    # Validate project structure
                    required_fields = ["id", "title", "category", "description", "technologies", "highlights", "github", "demo", "image"]
                    all_valid = True
                    validation_errors = []
                    
                    for i, project in enumerate(projects):
                        missing_fields = [field for field in required_fields if field not in project]
                        if missing_fields:
                            all_valid = False
                            validation_errors.append(f"Project {i+1} missing fields: {missing_fields}")
                    
                    if all_valid:
                        self.log_test("Get Projects", True, f"Retrieved {len(projects)} projects with valid structure", {
                            "status_code": response.status_code,
                            "project_count": len(projects),
                            "project_titles": [p.get("title", "Unknown") for p in projects]
                        })
                        return projects
                    else:
                        self.log_test("Get Projects", False, "Projects have invalid structure", {
                            "status_code": response.status_code,
                            "validation_errors": validation_errors
                        })
                else:
                    self.log_test("Get Projects", False, f"Expected 4 projects, got {len(projects) if isinstance(projects, list) else 'non-list'}", {
                        "status_code": response.status_code,
                        "actual_count": len(projects) if isinstance(projects, list) else "N/A",
                        "response_type": type(projects).__name__
                    })
            else:
                self.log_test("Get Projects", False, f"Unexpected status code: {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
        except Exception as e:
            self.log_test("Get Projects", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_get_experience(self):
        """Test GET /api/portfolio/experience - Get experience"""
        try:
            response = self.session.get(f"{self.base_url}/portfolio/experience")
            
            if response.status_code == 200:
                experience = response.json()
                
                if isinstance(experience, list) and len(experience) == 2:
                    # Validate experience structure
                    required_fields = ["id", "title", "company", "type", "duration", "startDate", "highlights"]
                    all_valid = True
                    validation_errors = []
                    
                    for i, exp in enumerate(experience):
                        missing_fields = [field for field in required_fields if field not in exp]
                        if missing_fields:
                            all_valid = False
                            validation_errors.append(f"Experience {i+1} missing fields: {missing_fields}")
                    
                    if all_valid:
                        self.log_test("Get Experience", True, f"Retrieved {len(experience)} experience entries with valid structure", {
                            "status_code": response.status_code,
                            "experience_count": len(experience),
                            "companies": [exp.get("company", "Unknown") for exp in experience]
                        })
                        return experience
                    else:
                        self.log_test("Get Experience", False, "Experience entries have invalid structure", {
                            "status_code": response.status_code,
                            "validation_errors": validation_errors
                        })
                else:
                    self.log_test("Get Experience", False, f"Expected 2 experience entries, got {len(experience) if isinstance(experience, list) else 'non-list'}", {
                        "status_code": response.status_code,
                        "actual_count": len(experience) if isinstance(experience, list) else "N/A",
                        "response_type": type(experience).__name__
                    })
            else:
                self.log_test("Get Experience", False, f"Unexpected status code: {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
        except Exception as e:
            self.log_test("Get Experience", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_get_skills(self):
        """Test GET /api/portfolio/skills - Get skills"""
        try:
            response = self.session.get(f"{self.base_url}/portfolio/skills")
            
            if response.status_code == 200:
                skills = response.json()
                
                expected_categories = ["design", "webDevelopment", "testing", "programming", "analytics", "marketing", "automation", "devTools"]
                
                if isinstance(skills, dict) and len(skills) == 8:
                    missing_categories = [cat for cat in expected_categories if cat not in skills]
                    
                    if not missing_categories:
                        self.log_test("Get Skills", True, f"Retrieved skills with all {len(skills)} expected categories", {
                            "status_code": response.status_code,
                            "categories": list(skills.keys()),
                            "total_skills": sum(len(skill_list) for skill_list in skills.values())
                        })
                        return skills
                    else:
                        self.log_test("Get Skills", False, f"Missing skill categories: {missing_categories}", {
                            "status_code": response.status_code,
                            "available_categories": list(skills.keys()),
                            "missing_categories": missing_categories
                        })
                else:
                    self.log_test("Get Skills", False, f"Expected 8 skill categories, got {len(skills) if isinstance(skills, dict) else 'non-dict'}", {
                        "status_code": response.status_code,
                        "actual_count": len(skills) if isinstance(skills, dict) else "N/A",
                        "response_type": type(skills).__name__
                    })
            else:
                self.log_test("Get Skills", False, f"Unexpected status code: {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
        except Exception as e:
            self.log_test("Get Skills", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_submit_contact(self):
        """Test POST /api/contact - Submit contact form"""
        test_contact = {
            "name": "Rifat Test User",
            "email": "rifat.test@example.com",
            "subject": "Portfolio API Test Contact",
            "message": "This is a test message to verify the contact form API endpoint is working correctly."
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contact",
                json=test_contact,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get("success") and "message" in data:
                    self.log_test("Submit Contact", True, "Contact form submitted successfully", {
                        "status_code": response.status_code,
                        "response": data,
                        "submitted_data": test_contact
                    })
                    return test_contact
                else:
                    self.log_test("Submit Contact", False, "Response missing success flag or message", {
                        "status_code": response.status_code,
                        "response": data
                    })
            else:
                self.log_test("Submit Contact", False, f"Unexpected status code: {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
        except Exception as e:
            self.log_test("Submit Contact", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_get_contacts(self):
        """Test GET /api/contacts - Get all contacts"""
        try:
            response = self.session.get(f"{self.base_url}/contacts")
            
            if response.status_code == 200:
                contacts = response.json()
                
                if isinstance(contacts, list):
                    # Check if our test contact is in the list
                    test_contact_found = False
                    for contact in contacts:
                        if (contact.get("email") == "rifat.test@example.com" and 
                            contact.get("subject") == "Portfolio API Test Contact"):
                            test_contact_found = True
                            break
                    
                    if test_contact_found:
                        self.log_test("Get Contacts", True, f"Retrieved {len(contacts)} contacts, test contact found", {
                            "status_code": response.status_code,
                            "contact_count": len(contacts),
                            "test_contact_found": True
                        })
                    else:
                        self.log_test("Get Contacts", False, f"Retrieved {len(contacts)} contacts, but test contact not found", {
                            "status_code": response.status_code,
                            "contact_count": len(contacts),
                            "test_contact_found": False,
                            "available_emails": [c.get("email", "Unknown") for c in contacts[:5]]  # Show first 5
                        })
                    
                    return contacts
                else:
                    self.log_test("Get Contacts", False, "Response is not a list", {
                        "status_code": response.status_code,
                        "response_type": type(contacts).__name__
                    })
            else:
                self.log_test("Get Contacts", False, f"Unexpected status code: {response.status_code}", {
                    "status_code": response.status_code,
                    "response": response.text
                })
        except Exception as e:
            self.log_test("Get Contacts", False, f"Request failed: {str(e)}")
        
        return None
    
    def test_contact_validation(self):
        """Test contact form validation with invalid data"""
        invalid_contacts = [
            {
                "name": "",  # Empty name
                "email": "rifat.test@example.com",
                "subject": "Test Subject",
                "message": "Test message"
            },
            {
                "name": "Test User",
                "email": "invalid-email",  # Invalid email
                "subject": "Test Subject", 
                "message": "Test message"
            },
            {
                "name": "Test User",
                "email": "rifat.test@example.com",
                "subject": "",  # Empty subject
                "message": "Test message"
            }
        ]
        
        validation_passed = True
        validation_details = []
        
        for i, invalid_contact in enumerate(invalid_contacts):
            try:
                response = self.session.post(
                    f"{self.base_url}/contact",
                    json=invalid_contact,
                    headers={"Content-Type": "application/json"}
                )
                
                # Should return 422 for validation errors
                if response.status_code in [400, 422]:
                    validation_details.append(f"Test {i+1}: Correctly rejected invalid data (status: {response.status_code})")
                else:
                    validation_passed = False
                    validation_details.append(f"Test {i+1}: Should have rejected invalid data but got status: {response.status_code}")
                    
            except Exception as e:
                validation_passed = False
                validation_details.append(f"Test {i+1}: Request failed: {str(e)}")
        
        if validation_passed:
            self.log_test("Contact Validation", True, "All validation tests passed", {
                "validation_details": validation_details
            })
        else:
            self.log_test("Contact Validation", False, "Some validation tests failed", {
                "validation_details": validation_details
            })
        
        return validation_passed
    
    def run_all_tests(self):
        """Run all API tests in sequence"""
        print(f"🚀 Starting Portfolio API Tests")
        print(f"📍 Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Test sequence
        tests = [
            ("Health Check", self.test_health_check),
            ("Get Portfolio", self.test_get_portfolio),
            ("Get Projects", self.test_get_projects),
            ("Get Experience", self.test_get_experience),
            ("Get Skills", self.test_get_skills),
            ("Submit Contact", self.test_submit_contact),
            ("Get Contacts", self.test_get_contacts),
            ("Contact Validation", self.test_contact_validation)
        ]
        
        for test_name, test_func in tests:
            print(f"\n🔍 Running {test_name}...")
            test_func()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"✅ Passed: {passed}/{total}")
        print(f"❌ Failed: {total - passed}/{total}")
        
        if passed == total:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check details above.")
            print("\nFailed Tests:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['message']}")
            return False

def main():
    """Main test execution"""
    tester = PortfolioAPITester(BACKEND_URL)
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()