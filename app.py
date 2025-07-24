from flask import Flask, render_template, request, flash, redirect, url_for
from datetime import datetime
import os

# Initialize Flask application
app = Flask(__name__)
app.secret_key = 'your-secret-key-here'  # Change this in production

# Sample data for demonstration
team_members = [
    {
        'name': 'John Doe',
        'role': 'Lead Developer',
        'bio': 'Full-stack developer with 8+ years of experience in Python and web technologies.',
        'image': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
        'name': 'Jane Smith',
        'role': 'UI/UX Designer',
        'bio': 'Creative designer passionate about user experience and modern web design.',
        'image': 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=300&h=300&fit=crop&crop=face'
    },
    {
        'name': 'Mike Johnson',
        'role': 'Backend Engineer',
        'bio': 'Specialized in database design and API development with Python and Flask.',
        'image': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    }
]

projects = [
    {
        'title': 'E-Commerce Platform',
        'description': 'A modern e-commerce solution built with Flask and React.',
        'technologies': ['Python', 'Flask', 'React', 'PostgreSQL'],
        'status': 'Completed'
    },
    {
        'title': 'Task Management System',
        'description': 'Collaborative task management tool for teams.',
        'technologies': ['Python', 'Flask', 'SQLAlchemy', 'Bootstrap'],
        'status': 'In Progress'
    },
    {
        'title': 'Data Analytics Dashboard',
        'description': 'Real-time analytics dashboard with interactive charts.',
        'technologies': ['Python', 'Flask', 'Chart.js', 'MongoDB'],
        'status': 'Planning'
    }
]

# Route for Home page
@app.route('/')
@app.route('/home')
def home():
    """Render the home page with featured projects"""
    featured_projects = projects[:2]  # Show first 2 projects as featured
    return render_template('home.html',
                          featured_projects=featured_projects,
                         current_year=datetime.now().year)

# Route for About page
@app.route('/about')
def about():
    """Render the about page with team information"""
    company_stats = {
        'years_experience': 5,
        'projects_completed': 50,
        'happy_clients': 30,
        'team_members': len(team_members)
    }
    return render_template('about.html',
                          team_members=team_members,
                         stats=company_stats,
                         all_projects=projects)

# Route for Contact page (GET request)
@app.route('/contact')
def contact():
    """Render the contact page"""
    return render_template('contact.html')

# Route for Contact form submission (POST request)
@app.route('/contact', methods=['POST'])
def contact_post():
    """Handle contact form submission"""
    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message = request.form.get('message')
    
    # Basic validation
    if not all([name, email, subject, message]):
        flash('All fields are required!', 'error')
        return render_template('contact.html')
    
    # In a real application, you would:
    # 1. Save to database
    # 2. Send email notification
    # 3. Implement proper validation
    
    # For demo purposes, just show success message
    flash(f'Thank you, {name}! Your message has been sent successfully. We\'ll get back to you soon.', 'success')
    
    # Redirect to prevent form resubmission
    return redirect(url_for('contact'))

# Route for Services page (additional page for demonstration)
@app.route('/services')
def services():
    """Render services page"""
    services_list = [
        {
            'title': 'Web Development',
            'description': 'Custom web applications built with modern technologies.',
            'icon': '🌐'
        },
        {
            'title': 'API Development',
            'description': 'RESTful APIs and microservices architecture.',
            'icon': '🔗'
        },
        {
            'title': 'Database Design',
            'description': 'Efficient database design and optimization.',
            'icon': '🗄️'
        },
        {
            'title': 'Consulting',
            'description': 'Technical consulting and architecture planning.',
            'icon': '💡'
        }
    ]
    return render_template('services.html', services=services_list)

# Custom error handlers
@app.errorhandler(404)
def not_found_error(error):
    """Handle 404 errors"""
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return render_template('500.html'), 500

# Custom template filters
@app.template_filter('capitalize_first')
def capitalize_first_filter(text):
    """Custom filter to capitalize first letter of each word"""
    return ' '.join(word.capitalize() for word in text.split())

# Context processor to make data available to all templates
@app.context_processor
def inject_global_vars():
    """Inject global variables into all templates"""
    return {
        'site_name': 'FlaskApp Pro',
        'current_year': datetime.now().year,
        'nav_items': [
            {'name': 'Home', 'url': 'home'},
            {'name': 'About', 'url': 'about'},
            {'name': 'Services', 'url': 'services'},
            {'name': 'Contact', 'url': 'contact'}
        ]
    }

if __name__ == '__main__':
    # Create templates directory if it doesn't exist
    if not os.path.exists('templates'):
        os.makedirs('templates')
    
    # Create static directory if it doesn't exist
    if not os.path.exists('static'):
        os.makedirs('static')
        os.makedirs('static/css')
        os.makedirs('static/js')
    
    # Run the application
    app.run(debug=True, host='0.0.0.0', port=5000)
