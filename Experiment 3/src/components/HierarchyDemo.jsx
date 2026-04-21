import React from 'react';
import { Person, Student, Teacher } from '../logic/entities';

const HierarchyDemo = () => {
    // Instantiate entities
    const person = new Person('Alex Johnson', 40);
    const student = new Student('Sofia Rivera', 21, 'S12345', 'Computer Science');
    const teacher = new Teacher('Dr. Marcus Smith', 52, 'E9876', 'Quantum Physics');

    const entities = [person, student, teacher];

    return (
        <div className="hierarchy-demo glass-card">
            <h2>Class Hierarchy & Inheritance</h2>
            <p className="description">Demonstrating inheritance between Person, Student, and Teacher classes.</p>
            
            <div className="entity-grid">
                {entities.map((entity, index) => (
                    <div key={index} className="entity-card">
                        <div className="entity-header">
                            <span className="role-badge">{entity.getRole()}</span>
                            <h3>{entity.name}</h3>
                        </div>
                        <div className="entity-body">
                            <p><strong>Details:</strong> {entity.getDetails()}</p>
                            <p><strong>Age:</strong> {entity.age}</p>
                            {entity instanceof Student && (
                                <>
                                    <p><strong>ID:</strong> {entity.studentId}</p>
                                    <p><strong>Course:</strong> {entity.course}</p>
                                </>
                            )}
                            {entity instanceof Teacher && (
                                <>
                                    <p><strong>ID:</strong> {entity.employeeId}</p>
                                    <p><strong>Subject:</strong> {entity.subject}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="polymorphism-demo glass-card">
                <h3>Polymorphism Demo</h3>
                <p className="description">Evidence of method overriding: The same method <code>greet()</code> is called on different objects, producing unique outputs.</p>
                <div className="demo-list">
                    {entities.map((entity, index) => (
                        <div key={index} className="demo-item">
                            <span className="role-small">{entity.getRole()}:</span>
                            <span className="greet-text">"{entity.greet()}"</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="code-snippet-box">
                <pre>
{`// Demonstration of Polymorphism
entities.forEach(entity => {
  console.log(entity.greet()); // Unique output per subclass!
});`}
                </pre>
            </div>
        </div>
    );
};

export default HierarchyDemo;
