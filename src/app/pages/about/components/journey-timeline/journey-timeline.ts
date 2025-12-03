import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-journey-timeline',
  imports: [CommonModule],
  templateUrl: './journey-timeline.html',
})
export class JourneyTimeline {
  timeline: TimelineEvent[] = [
    {
      year: '2018',
      title: 'The Origin: The Logic Behind Design',
      description:
        'I enrolled in Architecture at UNAM. Within months, I realized my fascination wasn’t in design itself, but in digital tools. I became the technical go-to: optimizing AutoCAD, configuring SketchUp, solving software and hardware issues for the entire studio. My mind was already processing systems, not just spaces.',
      icon: '🏗️',
      color: 'from-amber-400 to-orange-500',
    },
    {
      year: '2019-2021',
      title: 'Digitalization and Technical Mastery',
      description:
        'The pandemic accelerated everything toward digital. My role intensified: I mastered Revit, 3ds Max, Lumion, Photoshop, and Illustrator at an advanced level. I wasn’t the “creative” — I was the workflow engineer: the one who understood how each configuration affected the system, optimized renders, and ensured tools operated at their full potential.',
      icon: '⚙️',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      year: '2022',
      title: 'From Graphic Software to Systemic Automation',
      description:
        'I worked on public works in Xochimilco. My strengths shifted from the visual to the logical: I automated processes with advanced Excel, built control systems, and performed data analysis. I confirmed my mental pattern: translating complex real-world problems into structured, efficient, automatable systems. Programming emerged as the natural next step.',
      icon: '📊',
      color: 'from-emerald-400 to-green-500',
    },
    {
      year: '2023',
      title: 'The Discovery: Code as a Native Language',
      description:
        'An ASD Level 1 diagnosis gave me the framework to understand my mind: I am wired for systemic thinking, patterns, and pure logic. Programming isn’t just a tool — it’s the perfect medium for how I process the world. I began intensive, self-directed learning focused on engineering fundamentals: networking, security, and software architecture.',
      icon: '🧠',
      color: 'from-violet-400 to-purple-500',
    },
    {
      year: '2024',
      title: 'Software Engineering: My Natural Ecosystem',
      description:
        'I went deep into the foundations. I understood TLS/SSL at the protocol level, client-server architectures, relational databases, and API design. I built projects that reflect my mindset: systems designed from first principles, with attention to detail, security, and efficiency. Software engineering isn’t just a career I study; it’s how my brain already worked — now expressed in code.',
      icon: '🚀',
      color: 'from-indigo-400 to-blue-500',
    },
    {
      year: 'Present',
      title: 'The Future: Building Systems with Intention',
      description:
        'I’m looking to join a team where my unique perspective — that of a systemic thinker rooted in solving real-world problems — is valued. My goal: apply technical precision, deep understanding of fundamentals, and the ability to decompose complexity to build robust, scalable, well-grounded software.',
      icon: '🌟',
      color: 'from-rose-400 to-pink-500',
    },
  ];
}
