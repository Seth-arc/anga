// src/data/scenarios.ts
export interface Question {
    id: number;
    scenario: string;
    question: string;
}

export const scenarios: Question[] = [
  {
    id: 1,
    scenario: "While reviewing student feedback from your last module, you notice a clear divide in comprehension levels. Advanced students found the content too basic, while others struggled to keep up. Your next session is tomorrow.",
    question: "In your next session, would you implement multiple parallel activities at different difficulty levels?",
  },
  {
    id: 2,
    scenario: "Your students consistently score well on written tests but struggle to apply concepts in practical scenarios. A colleague suggests replacing some lecture time with simulation-based learning.",
    question: "Would you redesign your upcoming units to prioritize hands-on learning over traditional lectures?",
  },
  {
    id: 3,
    scenario: "During a particularly challenging topic, you notice students' eyes glazing over. You recall a creative visualization technique that worked in another context, but it would require departing from your planned lecture.",
    question: "Would you pause your planned lecture to try this alternative teaching approach?",
  },
  {
    id: 4,
    scenario: "The curriculum committee has introduced new assessment criteria emphasizing group work, but your students have historically performed better with individual assignments.",
    question: "Would you restructure your assessments to align with the new institutional direction?",
  },
  {
    id: 5,
    scenario: "A department initiative suggests breaking down your popular 12-week course into standalone workshops. Students could attend individual sessions based on their needs.",
    question: "Would you restructure your course into independent modules, even if it affects the narrative flow?",
  },
  {
    id: 6,
    scenario: "Your meticulously prepared digital resources crash just before a crucial session. You have your knowledge and a whiteboard, but none of your usual teaching aids.",
    question: "Would you proceed with the session using just basic tools and discussion?",
  },
  {
    id: 7,
    scenario: "A last-minute speaker cancellation leaves you to present a keynote to hundreds of peers. The topic aligns with your expertise, but you typically teach smaller groups.",
    question: "Would you step in to deliver the keynote presentation?",
  },
  {
    id: 8,
    scenario: "Student feedback suggests your content is excellent but your delivery could be more engaging. A teaching development course focusing on presentation skills is available.",
    question: "Would you prioritize improving your presentation skills over developing new content?",
  },
  {
    id: 9,
    scenario: "Midway through your lecture, you notice declining engagement. Some students are fidgeting, others checking phones. Your planned content still needs covering.",
    question: "Would you spontaneously incorporate physical movement into the lesson?",
  },
  {
    id: 10,
    scenario: "Students are debating a controversial theory in your field. They're engaged but starting to stray into speculation. You have extensive research experience in this area.",
    question: "Would you redirect the discussion to focus solely on established evidence?",
  },
  {
    id: 11,
    scenario: "A student's question reveals a fascinating but tangential topic that clearly interests the class. Exploring it would mean significant deviation from your lesson plan.",
    question: "Would you follow this unexpected learning opportunity?",
  },
  {
    id: 12,
    scenario: "Your expertise is highly specialized, but students need help with fundamental research methods. A colleague suggests co-teaching to combine your perspectives.",
    question: "Would you expand your teaching into these broader, foundational areas?",
  },
  {
    id: 13,
    scenario: "Your teaching consistently receives positive feedback, but a new teaching fellowship would require formal observation and assessment of your methods.",
    question: "Would you subject your teaching practice to formal evaluation for professional recognition?",
  },
  {
    id: 14,
    scenario: "After class, a student explains they're struggling with anxiety and requests regular one-on-one support sessions. You typically encourage peer study groups.",
    question: "Would you commit to providing regular individual mentoring?",
  },
  {
    id: 15,
    scenario: "You've developed an effective teaching approach for your engineering students. Now you're asked to teach the same concepts to business students.",
    question: "Would you significantly alter your teaching approach for this new audience?",
  },
  {
    id: 16,
    scenario: "Your students are struggling with a complex topic. You could provide a detailed study guide, or design activities that help them develop their own learning strategies.",
    question: "Would you choose to facilitate their own discovery of learning methods?",
  },
  {
    id: 17,
    scenario: "A teaching innovation grant is available for implementing new educational technology. Your current methods consistently achieve good results.",
    question: "Would you experiment with new teaching methods despite your current success?",
  },
  {
    id: 18,
    scenario: "Resource constraints mean choosing between running a large lecture series or multiple small-group tutorials. Both would achieve the learning outcomes.",
    question: "Would you choose the small-group format despite the increased teaching hours?",
  },
  {
    id: 19,
    scenario: "Students seem to grasp technical concepts but struggle with real-world implications. You consider using case studies and role-play to build empathy and understanding.",
    question: "Would you incorporate emotional learning experiences into technical topics?",
  },
  {
    id: 20,
    scenario: "Teaching a particularly heavy topic, you see an opportunity for appropriate humor to lighten the mood. Some colleagues prefer maintaining serious academic discourse.",
    question: "Would you integrate humor into formal academic discussions?",
  },
  {
    id: 21,
    scenario: "Your new classroom is designed for collaborative learning with casual seating arrangements. Your teaching style typically involves dynamic movement and presentation.",
    question: "Would you maintain your active teaching style despite the room's casual setup?",
  },
  {
    id: 22,
    scenario: "A prestigious teaching certification program opens for applications. It requires significant time investment and peer review of your teaching methods.",
    question: "Would you pursue formal recognition of your teaching expertise?",
  },
  {
    id: 23,
    scenario: "A new interdisciplinary program needs instructors comfortable teaching diverse groups. The content overlaps with your expertise but the audience will be highly varied.",
    question: "Would you volunteer to teach across multiple disciplines and professions?",
  },
  {
    id: 24,
    scenario: "Your department is standardizing teaching methods for core modules. The proposed approach differs from your successful personal style.",
    question: "Would you fully adopt the standardized teaching approach?"
  }
];