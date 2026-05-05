export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

// English Questions
const englishQuestions: Record<string, Question[]> = {
  "vocab-basics": [
    {
      id: "vb1",
      question: "What is the meaning of 'ubiquitous'?",
      options: ["Rare and unique", "Present everywhere", "Very small", "Extremely loud"],
      correctAnswer: 1,
      explanation: "Ubiquitous means present, appearing, or found everywhere."
    },
    {
      id: "vb2",
      question: "Which word is a synonym for 'benevolent'?",
      options: ["Cruel", "Kind", "Angry", "Confused"],
      correctAnswer: 1,
      explanation: "Benevolent means well-meaning and kindly."
    },
    {
      id: "vb3",
      question: "What does 'ephemeral' mean?",
      options: ["Lasting forever", "Short-lived", "Very heavy", "Extremely bright"],
      correctAnswer: 1,
      explanation: "Ephemeral describes something that lasts for a very short time."
    },
    {
      id: "vb4",
      question: "Choose the correct meaning of 'meticulous':",
      options: ["Careless", "Very careful and precise", "Quick", "Lazy"],
      correctAnswer: 1,
      explanation: "Meticulous means showing great attention to detail."
    },
    {
      id: "vb5",
      question: "What is the opposite of 'eloquent'?",
      options: ["Articulate", "Inarticulate", "Fluent", "Persuasive"],
      correctAnswer: 1,
      explanation: "Eloquent means fluent or persuasive in speaking, so inarticulate is the opposite."
    },
    {
      id: "vb6",
      question: "Which word means 'to make something less severe'?",
      options: ["Aggravate", "Mitigate", "Escalate", "Intensify"],
      correctAnswer: 1,
      explanation: "Mitigate means to make less severe, serious, or painful."
    },
    {
      id: "vb7",
      question: "What does 'pragmatic' mean?",
      options: ["Idealistic", "Practical and realistic", "Emotional", "Theoretical"],
      correctAnswer: 1,
      explanation: "Pragmatic means dealing with things sensibly and realistically."
    },
    {
      id: "vb8",
      question: "Choose the word that means 'to officially forbid something':",
      options: ["Allow", "Prohibit", "Encourage", "Support"],
      correctAnswer: 1,
      explanation: "Prohibit means to formally forbid something by law, rule, or authority."
    },
    {
      id: "vb9",
      question: "What is the meaning of 'ambiguous'?",
      options: ["Clear and obvious", "Open to multiple interpretations", "Simple", "Direct"],
      correctAnswer: 1,
      explanation: "Ambiguous means open to more than one interpretation; not clear."
    },
    {
      id: "vb10",
      question: "Which word means 'excessive pride'?",
      options: ["Humility", "Arrogance", "Modesty", "Shyness"],
      correctAnswer: 1,
      explanation: "Arrogance means having or revealing an exaggerated sense of one's importance."
    }
  ],
  "grammar-essentials": [
    {
      id: "ge1",
      question: "Which sentence uses the correct form of the verb?",
      options: [
        "She don't know the answer.",
        "She doesn't knows the answer.",
        "She doesn't know the answer.",
        "She don't knows the answer."
      ],
      correctAnswer: 2,
      explanation: "With third person singular (she), we use 'doesn't' + base form of verb."
    },
    {
      id: "ge2",
      question: "Choose the sentence with correct subject-verb agreement:",
      options: [
        "The team are playing well.",
        "The team is playing well.",
        "The team be playing well.",
        "The team were playing well."
      ],
      correctAnswer: 1,
      explanation: "In American English, collective nouns like 'team' are typically treated as singular."
    },
    {
      id: "ge3",
      question: "Which sentence uses the past perfect tense correctly?",
      options: [
        "I had ate dinner before she arrived.",
        "I had eaten dinner before she arrived.",
        "I have eaten dinner before she arrived.",
        "I was eaten dinner before she arrived."
      ],
      correctAnswer: 1,
      explanation: "Past perfect uses 'had' + past participle. 'Eaten' is the past participle of 'eat'."
    },
    {
      id: "ge4",
      question: "Identify the correct use of articles:",
      options: [
        "She is an university student.",
        "She is a university student.",
        "She is the university student.",
        "She is university student."
      ],
      correctAnswer: 1,
      explanation: "'University' begins with a consonant sound (yoo-), so we use 'a' not 'an'."
    },
    {
      id: "ge5",
      question: "Which sentence contains a dangling modifier?",
      options: [
        "Walking to school, I saw a rainbow.",
        "Walking to school, a rainbow appeared.",
        "While I was walking to school, I saw a rainbow.",
        "I saw a rainbow while walking to school."
      ],
      correctAnswer: 1,
      explanation: "A dangling modifier doesn't clearly modify the intended word. The rainbow wasn't walking."
    },
    {
      id: "ge6",
      question: "Choose the correct pronoun:",
      options: [
        "Between you and I, this is wrong.",
        "Between you and me, this is wrong.",
        "Between you and myself, this is wrong.",
        "Between yourself and I, this is wrong."
      ],
      correctAnswer: 1,
      explanation: "After prepositions like 'between', use object pronouns (me, not I)."
    },
    {
      id: "ge7",
      question: "Which sentence uses the conditional correctly?",
      options: [
        "If I would have known, I would have come.",
        "If I had known, I would have come.",
        "If I have known, I would have come.",
        "If I knew, I would have came."
      ],
      correctAnswer: 1,
      explanation: "Third conditional uses: If + past perfect, would have + past participle."
    },
    {
      id: "ge8",
      question: "Identify the sentence with parallel structure:",
      options: [
        "She likes swimming, to run, and biking.",
        "She likes to swim, running, and to bike.",
        "She likes swimming, running, and biking.",
        "She likes to swim, to run, and bikes."
      ],
      correctAnswer: 2,
      explanation: "Parallel structure requires consistent grammatical forms (all gerunds here)."
    },
    {
      id: "ge9",
      question: "Which is the correct comparative form?",
      options: [
        "This book is more better than that one.",
        "This book is gooder than that one.",
        "This book is better than that one.",
        "This book is more good than that one."
      ],
      correctAnswer: 2,
      explanation: "'Better' is the comparative form of 'good'. Don't use 'more' with it."
    },
    {
      id: "ge10",
      question: "Choose the sentence with correct comma usage:",
      options: [
        "I need eggs milk and bread.",
        "I need eggs, milk, and bread.",
        "I need, eggs milk and bread.",
        "I need eggs milk, and bread."
      ],
      correctAnswer: 1,
      explanation: "Items in a series should be separated by commas."
    }
  ],
  "reading-comprehension": [
    {
      id: "rc1",
      question: "What is the main purpose of a thesis statement?",
      options: [
        "To provide background information",
        "To state the central argument or claim",
        "To conclude the essay",
        "To list all topics covered"
      ],
      correctAnswer: 1,
      explanation: "A thesis statement presents the main argument that the essay will support."
    },
    {
      id: "rc2",
      question: "When identifying the main idea, you should look for:",
      options: [
        "The longest sentence",
        "The first sentence only",
        "The central message the author conveys",
        "The most complex vocabulary"
      ],
      correctAnswer: 2,
      explanation: "The main idea is the central message or point the author is making."
    },
    {
      id: "rc3",
      question: "Context clues help readers to:",
      options: [
        "Skip difficult words",
        "Understand unfamiliar words",
        "Read faster",
        "Memorize vocabulary"
      ],
      correctAnswer: 1,
      explanation: "Context clues are hints in the surrounding text that help define unknown words."
    },
    {
      id: "rc4",
      question: "An inference is:",
      options: [
        "A fact stated directly in the text",
        "A conclusion drawn from evidence",
        "The author's biography",
        "A summary of the text"
      ],
      correctAnswer: 1,
      explanation: "An inference is a logical conclusion based on evidence and reasoning."
    },
    {
      id: "rc5",
      question: "What distinguishes fact from opinion?",
      options: [
        "Facts are always longer",
        "Facts can be verified; opinions cannot",
        "Opinions are in the conclusion",
        "Facts use complex words"
      ],
      correctAnswer: 1,
      explanation: "Facts can be proven true or false; opinions express personal beliefs or judgments."
    },
    {
      id: "rc6",
      question: "The author's tone refers to:",
      options: [
        "The length of sentences",
        "The attitude conveyed through word choice",
        "The topic of the text",
        "The number of paragraphs"
      ],
      correctAnswer: 1,
      explanation: "Tone is the author's attitude toward the subject, shown through word choice and style."
    },
    {
      id: "rc7",
      question: "A text structure that shows cause and effect:",
      options: [
        "Lists items randomly",
        "Explains why something happened and its results",
        "Compares two unrelated topics",
        "Only describes appearances"
      ],
      correctAnswer: 1,
      explanation: "Cause and effect structure shows relationships between events and their results."
    },
    {
      id: "rc8",
      question: "Supporting details serve to:",
      options: [
        "Contradict the main idea",
        "Provide evidence for the main idea",
        "Confuse readers",
        "End the paragraph"
      ],
      correctAnswer: 1,
      explanation: "Supporting details give evidence, examples, or reasons that back up the main idea."
    }
  ],
  "idioms-phrases": [
    {
      id: "ip1",
      question: "What does 'break the ice' mean?",
      options: [
        "To damage something frozen",
        "To initiate social interaction",
        "To be very cold",
        "To end a relationship"
      ],
      correctAnswer: 1,
      explanation: "'Break the ice' means to do something to reduce tension or start a conversation."
    },
    {
      id: "ip2",
      question: "'Bite the bullet' means to:",
      options: [
        "Eat something hard",
        "Face a difficult situation bravely",
        "Make a mistake",
        "Start fighting"
      ],
      correctAnswer: 1,
      explanation: "To 'bite the bullet' means to endure a painful situation that is unavoidable."
    },
    {
      id: "ip3",
      question: "What does 'cost an arm and a leg' mean?",
      options: [
        "To injure yourself",
        "To be very expensive",
        "To lose something valuable",
        "To exercise too much"
      ],
      correctAnswer: 1,
      explanation: "This idiom means something costs a lot of money."
    },
    {
      id: "ip4",
      question: "'Under the weather' refers to:",
      options: [
        "Being outdoors",
        "Feeling ill",
        "Weather forecasting",
        "Being depressed about rain"
      ],
      correctAnswer: 1,
      explanation: "'Under the weather' means feeling unwell or sick."
    },
    {
      id: "ip5",
      question: "What does 'piece of cake' mean?",
      options: [
        "A dessert",
        "Something very easy",
        "A small portion",
        "A celebration"
      ],
      correctAnswer: 1,
      explanation: "'Piece of cake' means something is very easy to do."
    },
    {
      id: "ip6",
      question: "'Hit the nail on the head' means:",
      options: [
        "To do carpentry",
        "To describe something exactly right",
        "To hurt yourself",
        "To make a loud noise"
      ],
      correctAnswer: 1,
      explanation: "This idiom means to be exactly right about something."
    },
    {
      id: "ip7",
      question: "What does 'spill the beans' mean?",
      options: [
        "To make a mess while cooking",
        "To reveal a secret",
        "To waste food",
        "To plant vegetables"
      ],
      correctAnswer: 1,
      explanation: "'Spill the beans' means to reveal secret information."
    },
    {
      id: "ip8",
      question: "'Once in a blue moon' means:",
      options: [
        "At night",
        "Very rarely",
        "When the moon is blue",
        "Every month"
      ],
      correctAnswer: 1,
      explanation: "This idiom means something happens very rarely."
    }
  ],
  "advanced-vocabulary": [
    {
      id: "av1",
      question: "What does 'sycophant' mean?",
      options: [
        "A type of elephant",
        "A person who flatters for personal gain",
        "A musical instrument",
        "A geometric shape"
      ],
      correctAnswer: 1,
      explanation: "A sycophant is a person who acts obsequiously to gain advantage."
    },
    {
      id: "av2",
      question: "'Obfuscate' means to:",
      options: [
        "Make clear",
        "Make unclear or confusing",
        "Celebrate",
        "Simplify"
      ],
      correctAnswer: 1,
      explanation: "Obfuscate means to render obscure, unclear, or unintelligible."
    },
    {
      id: "av3",
      question: "What is a 'paradigm'?",
      options: [
        "A type of graph",
        "A typical example or model",
        "A mathematical formula",
        "A period of time"
      ],
      correctAnswer: 1,
      explanation: "A paradigm is a typical example or pattern of something."
    },
    {
      id: "av4",
      question: "'Perfunctory' describes something done:",
      options: [
        "With great care",
        "Without real interest or effort",
        "Perfectly",
        "Repeatedly"
      ],
      correctAnswer: 1,
      explanation: "Perfunctory means carried out with minimum effort or reflection."
    },
    {
      id: "av5",
      question: "What does 'taciturn' mean?",
      options: [
        "Talkative",
        "Reserved in speech",
        "Angry",
        "Confused"
      ],
      correctAnswer: 1,
      explanation: "Taciturn means reserved or uncommunicative in speech."
    },
    {
      id: "av6",
      question: "'Vicarious' experiences are:",
      options: [
        "Direct personal experiences",
        "Experienced through another person",
        "Forgettable experiences",
        "Dangerous experiences"
      ],
      correctAnswer: 1,
      explanation: "Vicarious means experienced through imaginative participation in another's experience."
    },
    {
      id: "av7",
      question: "What is 'zeitgeist'?",
      options: [
        "A type of ghost",
        "The spirit of the time/era",
        "A German dessert",
        "A philosophical theory"
      ],
      correctAnswer: 1,
      explanation: "Zeitgeist refers to the defining spirit or mood of a particular period."
    },
    {
      id: "av8",
      question: "'Quintessential' means:",
      options: [
        "Barely acceptable",
        "Representing the perfect example",
        "The fifth element",
        "Questionable quality"
      ],
      correctAnswer: 1,
      explanation: "Quintessential means representing the most perfect or typical example."
    }
  ],
  "writing-skills": [
    {
      id: "ws1",
      question: "What makes an effective thesis statement?",
      options: [
        "It should be vague and general",
        "It should be specific and arguable",
        "It should be a question",
        "It should be in the conclusion"
      ],
      correctAnswer: 1,
      explanation: "An effective thesis is specific, arguable, and guides the entire essay."
    },
    {
      id: "ws2",
      question: "Transitions between paragraphs should:",
      options: [
        "Repeat the same words",
        "Create logical connections between ideas",
        "Be avoided entirely",
        "Only appear in conclusions"
      ],
      correctAnswer: 1,
      explanation: "Transitions help readers follow the logical flow between ideas."
    },
    {
      id: "ws3",
      question: "Active voice is preferred because it:",
      options: [
        "Uses more words",
        "Makes writing direct and clear",
        "Sounds more formal",
        "Hides the subject"
      ],
      correctAnswer: 1,
      explanation: "Active voice creates clearer, more direct, and more engaging writing."
    },
    {
      id: "ws4",
      question: "What is the purpose of a topic sentence?",
      options: [
        "To end the paragraph",
        "To introduce the main idea of the paragraph",
        "To provide citations",
        "To confuse readers"
      ],
      correctAnswer: 1,
      explanation: "A topic sentence introduces the main idea that the paragraph will develop."
    },
    {
      id: "ws5",
      question: "Concise writing involves:",
      options: [
        "Using as many words as possible",
        "Eliminating unnecessary words",
        "Writing very short sentences",
        "Avoiding details"
      ],
      correctAnswer: 1,
      explanation: "Concise writing expresses ideas clearly without unnecessary words."
    },
    {
      id: "ws6",
      question: "A strong conclusion should:",
      options: [
        "Introduce new arguments",
        "Summarize and provide closure",
        "Be longer than the introduction",
        "Ask many questions"
      ],
      correctAnswer: 1,
      explanation: "A conclusion synthesizes the main points and gives the reader closure."
    },
    {
      id: "ws7",
      question: "Varied sentence structure helps to:",
      options: [
        "Confuse readers",
        "Maintain reader interest",
        "Make writing harder to read",
        "Fill space"
      ],
      correctAnswer: 1,
      explanation: "Varying sentence length and structure keeps writing engaging."
    },
    {
      id: "ws8",
      question: "When revising, you should first focus on:",
      options: [
        "Spelling errors",
        "Organization and content",
        "Font style",
        "Page margins"
      ],
      correctAnswer: 1,
      explanation: "Revision starts with big-picture issues like organization before surface errors."
    }
  ]
}

// Programming Questions
const programmingQuestions: Record<string, Question[]> = {
  "python-basics": [
    {
      id: "pb1",
      question: "What is the correct way to create a variable in Python?",
      options: [
        "var x = 5",
        "int x = 5",
        "x = 5",
        "let x = 5"
      ],
      correctAnswer: 2,
      explanation: "Python uses dynamic typing, so you simply assign a value: x = 5"
    },
    {
      id: "pb2",
      question: "Which of the following is a Python list?",
      options: [
        "{1, 2, 3}",
        "(1, 2, 3)",
        "[1, 2, 3]",
        "<1, 2, 3>"
      ],
      correctAnswer: 2,
      explanation: "Lists in Python use square brackets: [1, 2, 3]"
    },
    {
      id: "pb3",
      question: "How do you write a comment in Python?",
      options: [
        "// This is a comment",
        "# This is a comment",
        "/* This is a comment */",
        "-- This is a comment"
      ],
      correctAnswer: 1,
      explanation: "Python uses # for single-line comments."
    },
    {
      id: "pb4",
      question: "What does the 'len()' function do?",
      options: [
        "Returns the length of an object",
        "Converts to lowercase",
        "Creates a new list",
        "Deletes an object"
      ],
      correctAnswer: 0,
      explanation: "len() returns the number of items in an object."
    },
    {
      id: "pb5",
      question: "Which operator is used for exponentiation in Python?",
      options: ["^", "**", "^^", "exp"],
      correctAnswer: 1,
      explanation: "Python uses ** for exponentiation: 2**3 = 8"
    },
    {
      id: "pb6",
      question: "What is the output of: print(type(3.14))?",
      options: [
        "<class 'int'>",
        "<class 'float'>",
        "<class 'double'>",
        "<class 'number'>"
      ],
      correctAnswer: 1,
      explanation: "Decimal numbers in Python are of type 'float'."
    },
    {
      id: "pb7",
      question: "How do you define a function in Python?",
      options: [
        "function myFunc():",
        "def myFunc():",
        "func myFunc():",
        "define myFunc():"
      ],
      correctAnswer: 1,
      explanation: "Python uses 'def' keyword to define functions."
    },
    {
      id: "pb8",
      question: "What is the correct way to create a dictionary?",
      options: [
        "d = (1: 'a', 2: 'b')",
        "d = [1: 'a', 2: 'b']",
        "d = {1: 'a', 2: 'b'}",
        "d = <1: 'a', 2: 'b'>"
      ],
      correctAnswer: 2,
      explanation: "Dictionaries use curly braces with key:value pairs."
    },
    {
      id: "pb9",
      question: "Which method adds an element to the end of a list?",
      options: ["add()", "append()", "insert()", "push()"],
      correctAnswer: 1,
      explanation: "The append() method adds an element to the end of a list."
    },
    {
      id: "pb10",
      question: "What does 'elif' stand for?",
      options: ["else if", "element if", "else finally", "end loop if"],
      correctAnswer: 0,
      explanation: "'elif' is short for 'else if' in Python."
    }
  ],
  "javascript-fundamentals": [
    {
      id: "jf1",
      question: "Which keyword declares a constant in JavaScript?",
      options: ["var", "let", "const", "constant"],
      correctAnswer: 2,
      explanation: "'const' declares a constant that cannot be reassigned."
    },
    {
      id: "jf2",
      question: "What is the output of: typeof []?",
      options: ["'array'", "'object'", "'list'", "'undefined'"],
      correctAnswer: 1,
      explanation: "Arrays in JavaScript are a type of object."
    },
    {
      id: "jf3",
      question: "Which method converts a string to uppercase?",
      options: ["toUpper()", "uppercase()", "toUpperCase()", "upper()"],
      correctAnswer: 2,
      explanation: "toUpperCase() converts a string to uppercase letters."
    },
    {
      id: "jf4",
      question: "What does '===' check for?",
      options: [
        "Value equality only",
        "Type equality only",
        "Value and type equality",
        "Reference equality"
      ],
      correctAnswer: 2,
      explanation: "'===' checks both value and type (strict equality)."
    },
    {
      id: "jf5",
      question: "How do you create an arrow function?",
      options: [
        "function => {}",
        "() -> {}",
        "() => {}",
        "=> () {}"
      ],
      correctAnswer: 2,
      explanation: "Arrow functions use the => syntax: () => {}"
    },
    {
      id: "jf6",
      question: "What is 'null' in JavaScript?",
      options: [
        "An undefined variable",
        "An intentional absence of value",
        "A syntax error",
        "A number"
      ],
      correctAnswer: 1,
      explanation: "'null' represents an intentional absence of any object value."
    },
    {
      id: "jf7",
      question: "Which array method creates a new array with filtered elements?",
      options: ["find()", "filter()", "map()", "reduce()"],
      correctAnswer: 1,
      explanation: "filter() creates a new array with elements that pass a test."
    },
    {
      id: "jf8",
      question: "What does JSON stand for?",
      options: [
        "JavaScript Object Notation",
        "Java Standard Object Notation",
        "JavaScript Online Notation",
        "Java Serialized Object Network"
      ],
      correctAnswer: 0,
      explanation: "JSON = JavaScript Object Notation, a data interchange format."
    },
    {
      id: "jf9",
      question: "How do you check if a variable is an array?",
      options: [
        "typeof x === 'array'",
        "x.isArray()",
        "Array.isArray(x)",
        "x instanceof 'Array'"
      ],
      correctAnswer: 2,
      explanation: "Array.isArray() is the proper way to check if something is an array."
    },
    {
      id: "jf10",
      question: "What is the purpose of 'use strict'?",
      options: [
        "To enable new features",
        "To enforce stricter parsing and error handling",
        "To improve performance",
        "To enable async/await"
      ],
      correctAnswer: 1,
      explanation: "'use strict' enforces stricter parsing and catches common errors."
    }
  ],
  "data-structures": [
    {
      id: "ds1",
      question: "What is the time complexity of accessing an array element by index?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correctAnswer: 1,
      explanation: "Array access by index is O(1) - constant time."
    },
    {
      id: "ds2",
      question: "Which data structure uses LIFO (Last In, First Out)?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correctAnswer: 1,
      explanation: "Stacks follow LIFO - the last element added is the first removed."
    },
    {
      id: "ds3",
      question: "What is a hash table's average time complexity for lookup?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "Hash tables provide O(1) average case lookup time."
    },
    {
      id: "ds4",
      question: "Which structure uses FIFO (First In, First Out)?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      correctAnswer: 1,
      explanation: "Queues follow FIFO - the first element added is the first removed."
    },
    {
      id: "ds5",
      question: "What is a binary tree?",
      options: [
        "A tree with exactly two nodes",
        "A tree where each node has at most two children",
        "A tree with only leaf nodes",
        "A tree with no children"
      ],
      correctAnswer: 1,
      explanation: "A binary tree is a tree where each node has at most two children."
    },
    {
      id: "ds6",
      question: "What is the main advantage of a linked list over an array?",
      options: [
        "Faster random access",
        "Efficient insertion and deletion",
        "Less memory usage",
        "Better cache performance"
      ],
      correctAnswer: 1,
      explanation: "Linked lists allow O(1) insertion/deletion at known positions."
    },
    {
      id: "ds7",
      question: "In a min-heap, the root node contains:",
      options: [
        "The maximum value",
        "The minimum value",
        "A random value",
        "The average value"
      ],
      correctAnswer: 1,
      explanation: "In a min-heap, the root always contains the minimum value."
    },
    {
      id: "ds8",
      question: "What is the space complexity of a binary tree with n nodes?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "A binary tree with n nodes requires O(n) space."
    }
  ],
  "algorithms": [
    {
      id: "al1",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(1)", "O(log n)", "O(n²)"],
      correctAnswer: 2,
      explanation: "Binary search has O(log n) time complexity as it halves the search space each step."
    },
    {
      id: "al2",
      question: "Which sorting algorithm has the best average case performance?",
      options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
      correctAnswer: 2,
      explanation: "Quick Sort has O(n log n) average case, better than O(n²) of others listed."
    },
    {
      id: "al3",
      question: "What is the main strategy of dynamic programming?",
      options: [
        "Recursion only",
        "Breaking problems into subproblems and storing results",
        "Random sampling",
        "Greedy selection"
      ],
      correctAnswer: 1,
      explanation: "Dynamic programming stores solutions to subproblems to avoid recomputation."
    },
    {
      id: "al4",
      question: "What is the worst case time complexity of Quick Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 2,
      explanation: "Quick Sort's worst case is O(n²) when the pivot is always the smallest/largest."
    },
    {
      id: "al5",
      question: "Which algorithm is used to find the shortest path in a weighted graph?",
      options: ["DFS", "BFS", "Dijkstra's Algorithm", "Binary Search"],
      correctAnswer: 2,
      explanation: "Dijkstra's algorithm finds shortest paths in weighted graphs."
    },
    {
      id: "al6",
      question: "What is the time complexity of Merge Sort?",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation: "Merge Sort always runs in O(n log n) time."
    },
    {
      id: "al7",
      question: "BFS uses which data structure?",
      options: ["Stack", "Queue", "Heap", "Tree"],
      correctAnswer: 1,
      explanation: "BFS (Breadth-First Search) uses a queue to explore level by level."
    },
    {
      id: "al8",
      question: "What is the purpose of the 'greedy' approach?",
      options: [
        "Find all possible solutions",
        "Make locally optimal choices at each step",
        "Use random selection",
        "Store all subproblem results"
      ],
      correctAnswer: 1,
      explanation: "Greedy algorithms make the locally optimal choice at each step."
    }
  ],
  "web-development": [
    {
      id: "wd1",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      correctAnswer: 0,
      explanation: "HTML = HyperText Markup Language, the standard markup for web pages."
    },
    {
      id: "wd2",
      question: "Which CSS property controls text size?",
      options: ["text-size", "font-size", "size", "text-style"],
      correctAnswer: 1,
      explanation: "font-size is the CSS property that controls text size."
    },
    {
      id: "wd3",
      question: "What is the purpose of the <head> element in HTML?",
      options: [
        "To display the main content",
        "To contain metadata about the document",
        "To create headers",
        "To add images"
      ],
      correctAnswer: 1,
      explanation: "The <head> contains metadata, links to stylesheets, and the title."
    },
    {
      id: "wd4",
      question: "Which CSS display value hides an element completely?",
      options: ["hidden", "invisible", "none", "hide"],
      correctAnswer: 2,
      explanation: "display: none removes the element from the document flow entirely."
    },
    {
      id: "wd5",
      question: "What is the purpose of 'alt' attribute in <img> tag?",
      options: [
        "To set image alignment",
        "To provide alternative text for accessibility",
        "To change image color",
        "To resize the image"
      ],
      correctAnswer: 1,
      explanation: "The alt attribute provides alternative text for screen readers and when images fail to load."
    },
    {
      id: "wd6",
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      correctAnswer: 2,
      explanation: "CSS = Cascading Style Sheets, used to style HTML elements."
    },
    {
      id: "wd7",
      question: "Which HTTP method is used to submit form data?",
      options: ["GET", "POST", "PUT", "SEND"],
      correctAnswer: 1,
      explanation: "POST is commonly used to submit form data as it keeps data in the body."
    },
    {
      id: "wd8",
      question: "What is flexbox in CSS?",
      options: [
        "A JavaScript library",
        "A one-dimensional layout method",
        "A color scheme",
        "A font family"
      ],
      correctAnswer: 1,
      explanation: "Flexbox is a one-dimensional CSS layout method for arranging items."
    }
  ],
  "sql-databases": [
    {
      id: "sd1",
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Question Language",
        "Structured Question Language",
        "Standard Query Logic"
      ],
      correctAnswer: 0,
      explanation: "SQL = Structured Query Language, used to manage relational databases."
    },
    {
      id: "sd2",
      question: "Which SQL command is used to retrieve data?",
      options: ["GET", "FETCH", "SELECT", "RETRIEVE"],
      correctAnswer: 2,
      explanation: "SELECT is used to retrieve data from a database."
    },
    {
      id: "sd3",
      question: "What is a primary key?",
      options: [
        "The first column in a table",
        "A unique identifier for each row",
        "A password for the database",
        "The most important column"
      ],
      correctAnswer: 1,
      explanation: "A primary key uniquely identifies each row in a table."
    },
    {
      id: "sd4",
      question: "Which clause is used to filter results in SQL?",
      options: ["FILTER", "WHERE", "HAVING", "IF"],
      correctAnswer: 1,
      explanation: "WHERE clause filters rows based on specified conditions."
    },
    {
      id: "sd5",
      question: "What does JOIN do in SQL?",
      options: [
        "Adds new rows",
        "Combines rows from two or more tables",
        "Deletes duplicate rows",
        "Creates a new table"
      ],
      correctAnswer: 1,
      explanation: "JOIN combines rows from two or more tables based on a related column."
    },
    {
      id: "sd6",
      question: "Which command is used to add a new row?",
      options: ["ADD", "CREATE", "INSERT", "NEW"],
      correctAnswer: 2,
      explanation: "INSERT INTO is used to add new rows to a table."
    },
    {
      id: "sd7",
      question: "What is a foreign key?",
      options: [
        "A key from another country",
        "A key that links to a primary key in another table",
        "An encrypted key",
        "A backup key"
      ],
      correctAnswer: 1,
      explanation: "A foreign key references the primary key of another table, establishing a relationship."
    },
    {
      id: "sd8",
      question: "Which SQL keyword removes duplicates from results?",
      options: ["UNIQUE", "DISTINCT", "SINGLE", "DIFFERENT"],
      correctAnswer: 1,
      explanation: "SELECT DISTINCT removes duplicate rows from the result set."
    }
  ]
}

export function getQuestions(category: string, moduleId: string): Question[] {
  const questionSet = category.toLowerCase() === "english" 
    ? englishQuestions 
    : programmingQuestions
  
  return questionSet[moduleId] || []
}

export function getAllModuleIds(category: string): string[] {
  const questionSet = category.toLowerCase() === "english" 
    ? englishQuestions 
    : programmingQuestions
  
  return Object.keys(questionSet)
}
