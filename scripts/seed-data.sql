-- NEAT Educational Platform Seed Data
-- Run this after setup-database.sql to populate initial content

-- Insert Categories
INSERT INTO public.categories (id, name, description, icon, color, display_order) VALUES
  ('11111111-1111-1111-1111-111111111111', 'English', 'Master the English language with vocabulary, grammar, and comprehension exercises', 'BookOpen', '#3B82F6', 1),
  ('22222222-2222-2222-2222-222222222222', 'Programming', 'Learn programming fundamentals and popular languages', 'Code', '#10B981', 2)
ON CONFLICT (name) DO NOTHING;

-- Insert English Modules
INSERT INTO public.modules (id, category_id, name, description, icon, difficulty, points_reward, display_order) VALUES
  ('e1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Basic Vocabulary', 'Essential words for everyday communication', 'BookA', 'beginner', 10, 1),
  ('e2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Grammar Fundamentals', 'Learn basic grammar rules and sentence structure', 'FileText', 'beginner', 15, 2),
  ('e3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Reading Comprehension', 'Improve your reading and understanding skills', 'BookOpen', 'intermediate', 20, 3),
  ('e4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Advanced Vocabulary', 'Expand your vocabulary with advanced words', 'GraduationCap', 'advanced', 25, 4),
  ('e5555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'Idioms & Expressions', 'Learn common idioms and expressions', 'MessageCircle', 'intermediate', 20, 5),
  ('e6666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'Business English', 'Professional vocabulary for the workplace', 'Briefcase', 'advanced', 30, 6);

-- Insert Programming Modules
INSERT INTO public.modules (id, category_id, name, description, icon, difficulty, points_reward, display_order) VALUES
  ('p1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Programming Basics', 'Introduction to programming concepts', 'Terminal', 'beginner', 10, 1),
  ('p2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'JavaScript Fundamentals', 'Learn the basics of JavaScript', 'FileCode', 'beginner', 15, 2),
  ('p3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Python Essentials', 'Get started with Python programming', 'Code', 'beginner', 15, 3),
  ('p4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Data Structures', 'Learn essential data structures', 'Database', 'intermediate', 25, 4),
  ('p5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'Algorithms', 'Master common algorithms', 'Cpu', 'advanced', 30, 5),
  ('p6666666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', 'Web Development', 'Build websites with HTML, CSS, and JS', 'Globe', 'intermediate', 20, 6);

-- Insert English Questions - Basic Vocabulary
INSERT INTO public.questions (module_id, question_text, question_type, options, correct_answer, explanation, points, difficulty) VALUES
  ('e1111111-1111-1111-1111-111111111111', 'What is the meaning of "abundant"?', 'multiple_choice', '["Scarce", "Plentiful", "Empty", "Broken"]', 'Plentiful', 'Abundant means existing in large quantities; plentiful.', 10, 'easy'),
  ('e1111111-1111-1111-1111-111111111111', 'Choose the correct synonym for "happy":', 'multiple_choice', '["Sad", "Angry", "Joyful", "Tired"]', 'Joyful', 'Joyful means feeling or expressing great happiness.', 10, 'easy'),
  ('e1111111-1111-1111-1111-111111111111', 'What does "benevolent" mean?', 'multiple_choice', '["Kind and generous", "Cruel", "Lazy", "Fast"]', 'Kind and generous', 'Benevolent means well-meaning and kindly.', 10, 'medium'),
  ('e1111111-1111-1111-1111-111111111111', 'The word "ubiquitous" means:', 'multiple_choice', '["Rare", "Present everywhere", "Hidden", "Ancient"]', 'Present everywhere', 'Ubiquitous means present, appearing, or found everywhere.', 10, 'hard'),
  ('e1111111-1111-1111-1111-111111111111', 'What is the opposite of "transparent"?', 'multiple_choice', '["Clear", "Opaque", "Visible", "Bright"]', 'Opaque', 'Opaque means not transparent; not able to be seen through.', 10, 'medium'),
  ('e1111111-1111-1111-1111-111111111111', 'Choose the correct meaning of "diligent":', 'multiple_choice', '["Lazy", "Careless", "Hardworking", "Slow"]', 'Hardworking', 'Diligent means showing care and effort in work or duties.', 10, 'easy'),
  ('e1111111-1111-1111-1111-111111111111', 'What does "ephemeral" mean?', 'multiple_choice', '["Lasting forever", "Short-lived", "Heavy", "Colorful"]', 'Short-lived', 'Ephemeral means lasting for a very short time.', 10, 'hard'),
  ('e1111111-1111-1111-1111-111111111111', 'The word "eloquent" describes someone who is:', 'multiple_choice', '["Quiet", "Fluent and persuasive in speaking", "Rude", "Confused"]', 'Fluent and persuasive in speaking', 'Eloquent means fluent or persuasive in speaking or writing.', 10, 'medium'),
  ('e1111111-1111-1111-1111-111111111111', 'What is the meaning of "resilient"?', 'multiple_choice', '["Fragile", "Able to recover quickly", "Slow", "Weak"]', 'Able to recover quickly', 'Resilient means able to withstand or recover quickly from difficulties.', 10, 'medium'),
  ('e1111111-1111-1111-1111-111111111111', 'Choose the synonym for "meticulous":', 'multiple_choice', '["Careless", "Thorough and careful", "Fast", "Simple"]', 'Thorough and careful', 'Meticulous means showing great attention to detail; very careful.', 10, 'medium');

-- Insert English Questions - Grammar Fundamentals
INSERT INTO public.questions (module_id, question_text, question_type, options, correct_answer, explanation, points, difficulty) VALUES
  ('e2222222-2222-2222-2222-222222222222', 'Which sentence is grammatically correct?', 'multiple_choice', '["She dont like coffee", "She does not like coffee", "She not like coffee", "She no like coffee"]', 'She does not like coffee', 'The correct form uses "does not" with third person singular.', 15, 'easy'),
  ('e2222222-2222-2222-2222-222222222222', 'Choose the correct form: "I ___ to the store yesterday."', 'multiple_choice', '["go", "went", "gone", "going"]', 'went', 'Past tense of "go" is "went".', 15, 'easy'),
  ('e2222222-2222-2222-2222-222222222222', 'Which is the correct possessive form?', 'multiple_choice', '["The dogs bone", "The dog''s bone", "The dogs'' bone", "The dog bone"]', 'The dog''s bone', 'Singular possessive uses apostrophe + s.', 15, 'easy'),
  ('e2222222-2222-2222-2222-222222222222', 'Identify the correct sentence:', 'multiple_choice', '["Their going to the park", "There going to the park", "They''re going to the park", "Theyre going to the park"]', 'They''re going to the park', 'They''re is the contraction of "they are".', 15, 'medium'),
  ('e2222222-2222-2222-2222-222222222222', 'Which sentence uses the present perfect tense correctly?', 'multiple_choice', '["I have saw that movie", "I have seen that movie", "I have seeing that movie", "I seen that movie"]', 'I have seen that movie', 'Present perfect uses have/has + past participle.', 15, 'medium'),
  ('e2222222-2222-2222-2222-222222222222', 'Choose the correct article: "___ apple a day keeps the doctor away."', 'multiple_choice', '["A", "An", "The", "No article needed"]', 'An', 'Use "an" before words starting with vowel sounds.', 15, 'easy'),
  ('e2222222-2222-2222-2222-222222222222', 'Which is the correct comparative form?', 'multiple_choice', '["More better", "Better", "More good", "Gooder"]', 'Better', '"Better" is the comparative form of "good".', 15, 'easy'),
  ('e2222222-2222-2222-2222-222222222222', 'Identify the subject in: "The quick brown fox jumps over the lazy dog."', 'multiple_choice', '["quick brown", "fox", "The quick brown fox", "dog"]', 'The quick brown fox', 'The complete subject includes the noun and its modifiers.', 15, 'medium'),
  ('e2222222-2222-2222-2222-222222222222', 'Which sentence is in passive voice?', 'multiple_choice', '["John wrote the letter", "The letter was written by John", "John is writing the letter", "John will write the letter"]', 'The letter was written by John', 'Passive voice: subject receives the action.', 15, 'hard'),
  ('e2222222-2222-2222-2222-222222222222', 'Choose the correct conditional: "If I ___ rich, I would travel the world."', 'multiple_choice', '["am", "was", "were", "be"]', 'were', 'Second conditional uses "were" for all subjects.', 15, 'hard');

-- Insert Programming Questions - Programming Basics
INSERT INTO public.questions (module_id, question_text, question_type, options, correct_answer, explanation, points, difficulty) VALUES
  ('p1111111-1111-1111-1111-111111111111', 'What is a variable in programming?', 'multiple_choice', '["A fixed value", "A container for storing data", "A type of loop", "A function"]', 'A container for storing data', 'Variables store data values that can change during program execution.', 10, 'easy'),
  ('p1111111-1111-1111-1111-111111111111', 'Which of the following is a loop structure?', 'multiple_choice', '["if-else", "for", "switch", "try-catch"]', 'for', 'A for loop repeats a block of code a specified number of times.', 10, 'easy'),
  ('p1111111-1111-1111-1111-111111111111', 'What does "debugging" mean?', 'multiple_choice', '["Writing new code", "Finding and fixing errors", "Deleting files", "Creating backups"]', 'Finding and fixing errors', 'Debugging is the process of identifying and removing errors from code.', 10, 'easy'),
  ('p1111111-1111-1111-1111-111111111111', 'What is an algorithm?', 'multiple_choice', '["A programming language", "A step-by-step procedure to solve a problem", "A type of variable", "A software application"]', 'A step-by-step procedure to solve a problem', 'An algorithm is a sequence of instructions to accomplish a task.', 10, 'easy'),
  ('p1111111-1111-1111-1111-111111111111', 'What is the purpose of a conditional statement?', 'multiple_choice', '["To repeat code", "To make decisions based on conditions", "To store data", "To define functions"]', 'To make decisions based on conditions', 'Conditional statements execute different code based on conditions.', 10, 'medium'),
  ('p1111111-1111-1111-1111-111111111111', 'What is a function?', 'multiple_choice', '["A data type", "A reusable block of code", "A variable type", "A file format"]', 'A reusable block of code', 'Functions are reusable code blocks that perform specific tasks.', 10, 'easy'),
  ('p1111111-1111-1111-1111-111111111111', 'What does "syntax" refer to in programming?', 'multiple_choice', '["The speed of code", "The rules for writing code", "The color of text", "The size of files"]', 'The rules for writing code', 'Syntax defines the structure and rules for writing valid code.', 10, 'easy'),
  ('p1111111-1111-1111-1111-111111111111', 'What is the difference between "==" and "=" in most programming languages?', 'multiple_choice', '["No difference", "== is assignment, = is comparison", "= is assignment, == is comparison", "Both are comparisons"]', '= is assignment, == is comparison', '= assigns values, == compares values for equality.', 10, 'medium'),
  ('p1111111-1111-1111-1111-111111111111', 'What is a "string" in programming?', 'multiple_choice', '["A number", "A sequence of characters", "A boolean value", "An array"]', 'A sequence of characters', 'A string is a data type representing text or characters.', 10, 'easy'),
  ('p1111111-1111-1111-1111-111111111111', 'What does "compile" mean?', 'multiple_choice', '["Run a program", "Convert code to machine language", "Debug code", "Write comments"]', 'Convert code to machine language', 'Compiling translates source code into executable machine code.', 10, 'medium');

-- Insert Programming Questions - JavaScript Fundamentals
INSERT INTO public.questions (module_id, question_text, question_type, options, correct_answer, explanation, points, difficulty) VALUES
  ('p2222222-2222-2222-2222-222222222222', 'How do you declare a variable in JavaScript?', 'multiple_choice', '["var x = 5", "variable x = 5", "v x = 5", "declare x = 5"]', 'var x = 5', 'JavaScript uses var, let, or const to declare variables.', 15, 'easy'),
  ('p2222222-2222-2222-2222-222222222222', 'Which method adds an element to the end of an array?', 'multiple_choice', '["push()", "pop()", "shift()", "unshift()"]', 'push()', 'push() adds elements to the end of an array.', 15, 'easy'),
  ('p2222222-2222-2222-2222-222222222222', 'What is the output of: console.log(typeof [])?', 'multiple_choice', '["array", "object", "list", "undefined"]', 'object', 'In JavaScript, arrays are technically objects.', 15, 'medium'),
  ('p2222222-2222-2222-2222-222222222222', 'How do you write a comment in JavaScript?', 'multiple_choice', '["# comment", "// comment", "/* comment */", "Both // and /* */"]', 'Both // and /* */', 'JavaScript supports both single-line (//) and multi-line (/* */) comments.', 15, 'easy'),
  ('p2222222-2222-2222-2222-222222222222', 'What is the difference between let and const?', 'multiple_choice', '["No difference", "let can be reassigned, const cannot", "const can be reassigned, let cannot", "Both cannot be reassigned"]', 'let can be reassigned, const cannot', 'const creates a constant reference that cannot be reassigned.', 15, 'medium'),
  ('p2222222-2222-2222-2222-222222222222', 'What does the === operator check?', 'multiple_choice', '["Only value", "Only type", "Both value and type", "Neither"]', 'Both value and type', '=== is the strict equality operator checking both value and type.', 15, 'medium'),
  ('p2222222-2222-2222-2222-222222222222', 'How do you create a function in JavaScript?', 'multiple_choice', '["function myFunc() {}", "def myFunc() {}", "func myFunc() {}", "create function myFunc() {}"]', 'function myFunc() {}', 'Functions are declared using the function keyword.', 15, 'easy'),
  ('p2222222-2222-2222-2222-222222222222', 'What is a callback function?', 'multiple_choice', '["A function that calls itself", "A function passed as an argument", "A function that returns a value", "A function with no parameters"]', 'A function passed as an argument', 'A callback is a function passed to another function as an argument.', 15, 'medium'),
  ('p2222222-2222-2222-2222-222222222222', 'What does JSON stand for?', 'multiple_choice', '["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Online Notation", "Java Serialized Object Notation"]', 'JavaScript Object Notation', 'JSON is a lightweight data-interchange format.', 15, 'easy'),
  ('p2222222-2222-2222-2222-222222222222', 'What is the purpose of async/await in JavaScript?', 'multiple_choice', '["To speed up code", "To handle asynchronous operations", "To create loops", "To define variables"]', 'To handle asynchronous operations', 'async/await provides a cleaner way to work with promises.', 15, 'hard');

-- Insert Achievements
INSERT INTO public.achievements (name, description, icon, badge_color, points_required, achievement_type) VALUES
  ('First Steps', 'Complete your first quiz', 'Star', '#FFD700', NULL, 'completion'),
  ('Quick Learner', 'Complete 5 quizzes', 'Zap', '#3B82F6', NULL, 'completion'),
  ('Knowledge Seeker', 'Complete 10 quizzes', 'BookOpen', '#10B981', NULL, 'completion'),
  ('Point Collector', 'Earn 100 points', 'Coins', '#F59E0B', 100, 'points'),
  ('Rising Star', 'Earn 500 points', 'TrendingUp', '#8B5CF6', 500, 'points'),
  ('Champion', 'Earn 1000 points', 'Trophy', '#EF4444', 1000, 'points'),
  ('Consistent', 'Maintain a 3-day streak', 'Flame', '#F97316', NULL, 'streak'),
  ('Dedicated', 'Maintain a 7-day streak', 'Target', '#06B6D4', NULL, 'streak'),
  ('Unstoppable', 'Maintain a 30-day streak', 'Award', '#EC4899', NULL, 'streak'),
  ('Perfect Score', 'Get 100% on any quiz', 'CheckCircle', '#22C55E', NULL, 'special'),
  ('English Master', 'Complete all English modules', 'GraduationCap', '#3B82F6', NULL, 'completion'),
  ('Code Wizard', 'Complete all Programming modules', 'Code', '#10B981', NULL, 'completion');

-- Insert Sample Universities
INSERT INTO public.universities (name, description, location, website, ranking, programs) VALUES
  ('Harvard University', 'One of the world''s most prestigious universities, known for excellence in education and research.', 'Cambridge, Massachusetts, USA', 'https://www.harvard.edu', 1, '["Law", "Business", "Medicine", "Engineering", "Arts & Sciences"]'),
  ('MIT', 'Massachusetts Institute of Technology - A leader in science, engineering, and technology education.', 'Cambridge, Massachusetts, USA', 'https://www.mit.edu', 2, '["Engineering", "Computer Science", "Physics", "Mathematics", "Architecture"]'),
  ('Stanford University', 'Located in Silicon Valley, known for entrepreneurship and innovation.', 'Stanford, California, USA', 'https://www.stanford.edu', 3, '["Computer Science", "Business", "Engineering", "Law", "Medicine"]'),
  ('Oxford University', 'The oldest university in the English-speaking world with a rich history of academic excellence.', 'Oxford, United Kingdom', 'https://www.ox.ac.uk', 4, '["Philosophy", "Literature", "Law", "Medicine", "Sciences"]'),
  ('Cambridge University', 'World-renowned for academic achievement and original research.', 'Cambridge, United Kingdom', 'https://www.cam.ac.uk', 5, '["Natural Sciences", "Engineering", "Mathematics", "Economics", "Law"]');

-- Insert Sample Schools
INSERT INTO public.schools (name, description, location, website, school_type) VALUES
  ('Phillips Academy Andover', 'One of the oldest boarding schools in the United States, known for academic excellence.', 'Andover, Massachusetts, USA', 'https://www.andover.edu', 'private'),
  ('Eton College', 'Historic British independent boarding school known for producing leaders and scholars.', 'Windsor, United Kingdom', 'https://www.etoncollege.com', 'private'),
  ('Thomas Jefferson High School', 'Top-ranked public magnet school specializing in science and technology.', 'Alexandria, Virginia, USA', 'https://tjhsst.fcps.edu', 'public'),
  ('International School of Geneva', 'The world''s oldest international school, offering IB programs.', 'Geneva, Switzerland', 'https://www.ecolint.ch', 'international'),
  ('Singapore American School', 'Leading international school in Asia offering American curriculum.', 'Singapore', 'https://www.sas.edu.sg', 'international');

-- Insert Sample Cities
INSERT INTO public.cities (name, description, country, population, highlights) VALUES
  ('Boston', 'A hub for education and innovation, home to many prestigious universities.', 'United States', '675,647', '["Harvard University", "MIT", "Freedom Trail", "Boston Harbor"]'),
  ('London', 'A global city known for its history, culture, and world-class education institutions.', 'United Kingdom', '8,982,000', '["British Museum", "Oxford Street", "Tower of London", "Imperial College"]'),
  ('Singapore', 'A modern city-state known for its excellent education system and multicultural environment.', 'Singapore', '5,850,000', '["Gardens by the Bay", "NUS", "Marina Bay Sands", "Sentosa Island"]'),
  ('Tokyo', 'Japan''s capital, blending tradition and innovation with top universities.', 'Japan', '13,960,000', '["University of Tokyo", "Shibuya", "Senso-ji Temple", "Akihabara"]'),
  ('Sydney', 'Australia''s largest city, known for beautiful beaches and quality education.', 'Australia', '5,312,000', '["Sydney Opera House", "University of Sydney", "Bondi Beach", "Harbour Bridge"]');
