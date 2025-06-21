import { SKILLS } from "@/lib/constants";

export function SkillsSection() {

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 fade-in">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground fade-in leading-relaxed">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {SKILLS.map((skill, index) => (
            <div key={skill.name} className="skill-item fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <i className={`${skill.icon} text-primary text-4xl mb-3`}></i>
              <h5 className="font-semibold">{skill.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
