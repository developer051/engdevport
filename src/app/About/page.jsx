"use client";
import React from "react";
import Image from "next/image";
import NavBar2 from "../components/NavBar2";
import Footer from "../components/Footer";


const AboutPage = () => {
  const skills = [
    {
      name: "Frontend Development",
      items: ["React.js", "Next.js", "TailwindCSS", "JavaScript"],
    },
    {
      name: "Backend Development",
      items: ["Node.js", "Python", "SQL", "RESTful APIs"],
    },
    {
      name: "Data Analytics",
      items: [
        "Data Mining",
        "Python Analytics",
        "Data Visualization",
        "Statistical Analysis",
      ],
    },
    {
      name: "Cybersecurity",
      items: [
        "Network Security",
        "Penetration Testing",
        "Security Auditing",
        "Risk Assessment",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <NavBar2 />
             {/* Hero Section */}
       <section className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black"></div>
         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center sm:text-left">
             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
               About <span className="text-green-400">Me</span>
             </h1>
             <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto sm:mx-0 text-center sm:text-left leading-relaxed">
               A passionate Full Stack Developer and Cybersecurity enthusiast
               with a strong foundation in Data Analytics. I transform complex
               problems into elegant solutions.
             </p>
           </div>
         </div>
       </section>

             {/* Main Content */}
       <section className="py-12 sm:py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
 
             {/* Profile Image */}
             <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-xl overflow-hidden mx-auto lg:mx-0">
               <Image
                 src="/supachai.jpg"
                 alt="Profile"
                 fill
                 className="object-cover"
                 priority
               />
             </div>


                         {/* Profile Content */}
             <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
               <h2 className="text-2xl sm:text-3xl font-bold">
                 Hi, I'm <span className="text-green-400">EngDev</span>
               </h2>
               <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                 With over 5 years of experience in software development, I
                 specialize in creating secure and scalable web applications. My
                 passion lies in the intersection of technology and
                 cybersecurity. I believe in writing clean, maintainable code and
                 implementing best practices in every project I undertake.
               </p>
               <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                 My journey in technology began with a curiosity about how things
                 work on the internet. This curiosity evolved into a passion for
                 building robust applications that not only meet user needs but
                 also prioritize security and performance. I enjoy solving complex
                 problems and turning innovative ideas into reality.
               </p>
                             <div className="space-y-3 sm:space-y-4 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                 <div className="flex items-center justify-center sm:justify-start space-x-2">
                   <svg
                     className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                       d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                     />
                   </svg>
                   <span className="text-sm sm:text-base">Full Stack Developer</span>
                 </div>
                 <div className="flex items-center justify-center sm:justify-start space-x-2">
                   <svg
                     className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                       d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                     />
                   </svg>
                   <span className="text-sm sm:text-base">Cybersecurity Specialist</span>
                 </div>
                 <div className="flex items-center justify-center sm:justify-start space-x-2">
                   <svg
                     className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth="2"
                       d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                     />
                   </svg>
                   <span className="text-sm sm:text-base">Data Analytics Expert</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

                     {/* Skills Section */}
        <section className="py-12 sm:py-16  bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-8 sm:mb-12">
              My <span className="text-green-400">Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                           {skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-green-400/50 transition-colors"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-green-400">
                    {skill.name}
                  </h3>
                  <ul className="space-y-1 sm:space-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="text-sm sm:text-base text-gray-300 flex items-center"
                      >
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-400 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
           </div>
         </div>
       </section>

       {/* Experience Section */}
       <section className="py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-left mb-12">
             Work <span className="text-green-400">Experience</span>
           </h2>
           <div className="space-y-8">
             <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 className="text-xl font-semibold text-green-400">Senior Full Stack Developer</h3>
                   <p className="text-gray-400">Tech Solutions Inc.</p>
                 </div>
                 <span className="text-sm text-gray-500">2022 - Present</span>
               </div>
               <p className="text-gray-300 leading-relaxed">
                 Leading development teams in creating enterprise-level applications.
                 Implemented security best practices and optimized application performance.
                 Mentored junior developers and conducted code reviews.
               </p>
             </div>
             
             <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 className="text-xl font-semibold text-green-400">Cybersecurity Analyst</h3>
                   <p className="text-gray-400">SecureNet Systems</p>
                 </div>
                 <span className="text-sm text-gray-500">2020 - 2022</span>
               </div>
               <p className="text-gray-300 leading-relaxed">
                 Conducted security assessments and penetration testing for various clients.
                 Developed security protocols and incident response procedures.
                 Analyzed threat intelligence and implemented preventive measures.
               </p>
             </div>
             
             <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h3 className="text-xl font-semibold text-green-400">Data Analyst</h3>
                   <p className="text-gray-400">Data Insights Corp</p>
                 </div>
                 <span className="text-sm text-gray-500">2018 - 2020</span>
               </div>
               <p className="text-gray-300 leading-relaxed">
                 Performed data mining and statistical analysis for business intelligence.
                 Created interactive dashboards and data visualization reports.
                 Collaborated with stakeholders to identify key business metrics.
               </p>
             </div>
           </div>
         </div>
       </section>

       {/* Education Section */}
       <section className="py-16 bg-black/50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-left mb-12">
             <span className="text-green-400">Education</span> & Certifications
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
               <h3 className="text-xl font-semibold text-green-400 mb-2">Bachelor of Computer Science</h3>
               <p className="text-gray-400 mb-2">University of Technology</p>
               <p className="text-sm text-gray-500 mb-4">2014 - 2018</p>
               <p className="text-gray-300 leading-relaxed">
                 Specialized in Software Engineering with focus on web development
                 and database management. Graduated with honors and completed
                 multiple capstone projects.
               </p>
             </div>
             
             <div className="p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
               <h3 className="text-xl font-semibold text-green-400 mb-2">Professional Certifications</h3>
               <ul className="space-y-2 text-gray-300">
                 <li className="flex items-center">
                   <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                   </svg>
                   Certified Ethical Hacker (CEH)
                 </li>
                 <li className="flex items-center">
                   <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                   </svg>
                   AWS Certified Solutions Architect
                 </li>
                 <li className="flex items-center">
                   <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                   </svg>
                   Google Data Analytics Professional
                 </li>
                 <li className="flex items-center">
                   <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                   </svg>
                   Microsoft Azure Developer Associate
                 </li>
               </ul>
             </div>
           </div>
         </div>
       </section>

       {/* Philosophy Section */}
       <section className="py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-left mb-12">
             My <span className="text-green-400">Philosophy</span>
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
               <div className="w-16 h-16 mx-auto mb-4 bg-green-400/20 rounded-full flex items-center justify-center">
                 <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <h3 className="text-xl font-semibold text-green-400 mb-3">Quality First</h3>
               <p className="text-gray-300 leading-relaxed">
                 I believe in delivering high-quality, well-tested code that not only
                 meets requirements but exceeds expectations. Every line of code
                 should be written with maintainability and scalability in mind.
               </p>
             </div>
             
             <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
               <div className="w-16 h-16 mx-auto mb-4 bg-green-400/20 rounded-full flex items-center justify-center">
                 <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                 </svg>
               </div>
               <h3 className="text-xl font-semibold text-green-400 mb-3">Security Minded</h3>
               <p className="text-gray-300 leading-relaxed">
                 Security is not an afterthought but a fundamental aspect of every
                 project. I implement security best practices from the ground up,
                 ensuring robust protection against modern threats.
               </p>
             </div>
             
             <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800">
               <div className="w-16 h-16 mx-auto mb-4 bg-green-400/20 rounded-full flex items-center justify-center">
                 <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
               </div>
               <h3 className="text-xl font-semibold text-green-400 mb-3">Continuous Learning</h3>
               <p className="text-gray-300 leading-relaxed">
                 Technology evolves rapidly, and I stay updated with the latest
                 trends and best practices. I believe in continuous learning and
                 sharing knowledge with the community.
               </p>
             </div>
           </div>
         </div>
       </section>
      <Footer />
    </main>
  );
};


export default AboutPage;
