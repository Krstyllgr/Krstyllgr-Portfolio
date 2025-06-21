import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 fade-in">About Me</h2>
          <p className="text-xl text-muted-foreground fade-in leading-relaxed">
            With experience in both frontend and backend development, I take pride in writing efficient code and delivering smooth user experiences. While continuing my work in a full-time role, I'm also open to freelance projects that challenge me to solve real-world problems through smart and elegant web solutions.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="card-custom fade-in">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-primary/10 rounded-full p-4 mr-4">
                  <i className="fas fa-code text-primary text-2xl"></i>
                </div>
                <h4 className="text-2xl font-semibold">Development</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I create robust, scalable applications using modern technologies. 
                From concept to deployment, I handle the entire development lifecycle 
                with attention to performance and user experience.
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-custom fade-in">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-success/10 rounded-full p-4 mr-4">
                  <i className="fas fa-lightbulb text-success text-2xl"></i>
                </div>
                <h4 className="text-2xl font-semibold">Problem Solving</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                I thrive on solving complex technical challenges and finding innovative solutions. 
                My analytical mindset helps me break down problems and implement efficient, 
                maintainable code.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
