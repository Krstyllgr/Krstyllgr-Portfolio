import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { InsertContact } from "@shared/schema";

export function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: InsertContact) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: "fas fa-envelope",
      title: "Email",
      value: "kristylaxleealegre0326@gmail.com",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: "fab fa-linkedin",
      title: "LinkedIn",
      value: "linkedin.com/in/kristyl-axlee-alegre-9722a8285",
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      icon: "fab fa-github",
      title: "GitHub",
      value: "github.com/krstylxllgr",
      color: "text-info",
      bg: "bg-blue-500/10",
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 fade-in">Get In Touch</h2>
          <p className="text-xl text-muted-foreground fade-in leading-relaxed">
            Ready to start your next project? Let's discuss how we can work together 
            to bring your ideas to life.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="card-custom fade-in mb-12">
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      {...form.register("firstName")}
                      className="form-control-custom"
                      placeholder="Enter your first name"
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-destructive text-sm mt-1">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      {...form.register("lastName")}
                      className="form-control-custom"
                      placeholder="Enter your last name"
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-destructive text-sm mt-1">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    className="form-control-custom"
                    placeholder="Enter your email address"
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    {...form.register("subject")}
                    className="form-control-custom"
                    placeholder="What's this about?"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...form.register("message")}
                    className="form-control-custom min-h-32"
                    placeholder="Tell me about your project..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>
                
                <div className="text-center">
                  <Button 
                    type="submit" 
                    className="btn-gradient text-lg px-8 py-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading mr-2"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-8">
            {contactInfo.map((info, index) => (
              <a
                key={info.title}
                href={info.title === "Email" ? `mailto:${info.value}` : 
                      info.title === "LinkedIn" ? `https://${info.value}` : 
                      `https://${info.value}`}
                target={info.title === "Email" ? "_self" : "_blank"}
                rel={info.title === "Email" ? "" : "noopener noreferrer"}
                className="fade-in hover:scale-110 transition-transform duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
                title={info.title}
              >
                <div className={`${info.bg} rounded-full p-6 w-20 h-20 flex items-center justify-center hover:shadow-lg transition-shadow duration-300`}>
                  <i className={`${info.icon} ${info.color} text-2xl`}></i>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
