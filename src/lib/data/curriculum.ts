/**
 * Curated Curriculum & Diagnostic Assessment Data for Machine Learning
 * Strictly conforming to the user-specified architectural diagram:
 *
 * Machine Learning
 *        |
 *        v
 * Python Fundamentals
 *        |
 *        v
 * Mathematics
 *        |
 *        +---- Linear Algebra
 *        |
 *        +---- Probability
 *        |
 *        +---- Statistics
 *                  |
 *                  v
 *           Data Analysis
 *                  |
 *                  v
 *           Machine Learning
 *                  |
 *                  v
 *            Deep Learning
 *                  |
 *                  v
 *           Real World Projects
 */

import type { Skill, SkillDependency, DiagnosticAssessment } from "../types/index.ts";

export const ML_SKILLS: Skill[] = [
  {
    id: "py-fundamentals",
    domainId: "machine-learning",
    name: "Python Fundamentals",
    slug: "python-fundamentals",
    description: "Core Python syntax, list comprehensions, lambda functions, control flow, and vectorized NumPy arrays.",
    level: "beginner",
    estimatedMinutes: 240,
    stage: 1,
    learningObjectives: [
      "Master Python data structures: lists, dicts, tuples, and sets",
      "Write idiomatic list and dictionary comprehensions",
      "Understand vectorized operations vs standard Python for-loops",
      "Handle exceptions and modular file organization"
    ],
    resources: [
      { title: "Python Official Docs - Data Structures", url: "https://docs.python.org/3/tutorial/datastructures.html", type: "documentation", sourceName: "Python.org" },
      { title: "NumPy Quickstart Guide", url: "https://numpy.org/doc/stable/user/quickstart.html", type: "article", sourceName: "NumPy.org" }
    ],
    explanation: {
      standard: "Python is the primary language of machine learning due to its clean syntax and extensive scientific library ecosystem (NumPy, SciPy, Pandas).",
      simplified: "Python lets you give instructions to computers in plain, readable sentences without worrying about low-level memory wiring.",
      analogy: "If assembly language is individual nuts and bolts, Python is a modular Lego set where complex structures snap together seamlessly.",
      workedExample: {
        title: "Vectorized Operations vs For-Loops",
        steps: [
          "1. In pure Python, squaring 1,000,000 numbers requires an explicit for-loop taking ~120ms.",
          "2. In NumPy, array ** 2 executes vectorized C-code utilizing SIMD CPU registers in ~1ms.",
          "3. Vectorization eliminates interpreter overhead and forms the foundation of all tensor operations."
        ],
        codeOrFormula: "import numpy as np\nx = np.arange(1_000_000)\n# Vectorized square:\nsquares = x ** 2",
        takeaway: "Always prefer vectorized NumPy tensor operations over explicit Python loops."
      },
      keyTerms: [
        { term: "Vectorization", definition: "Performing an operation simultaneously on entire array blocks rather than element-by-element." },
        { term: "Broadcasting", definition: "NumPy's ability to operate on arrays of differing shapes by stretching smaller dimensions." }
      ],
      misconceptions: [
        "Misconception: Python is inherently too slow for AI. (Reality: Heavy computation is executed in optimized C++/CUDA libraries under Python bindings)."
      ]
    }
  },
  {
    id: "linear-algebra",
    domainId: "machine-learning",
    name: "Linear Algebra",
    slug: "linear-algebra",
    description: "Vector spaces, dot products, matrix transformations, eigenvalues, and geometric interpretations of high-dimensional data.",
    level: "beginner",
    estimatedMinutes: 300,
    stage: 1,
    learningObjectives: [
      "Understand vectors as both coordinate points and directional arrows in space",
      "Compute dot products, matrix-vector multiplication, and matrix transformations",
      "Interpret orthogonal projections and vector norms (L1, L2)",
      "Understand eigenvalues and eigenvectors for dimensionality reduction"
    ],
    resources: [
      { title: "Essence of Linear Algebra", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", type: "video", sourceName: "3Blue1Brown" }
    ],
    explanation: {
      standard: "Linear algebra is the mathematical language of multi-dimensional spaces. Every dataset, image, and text embedding is represented as a matrix or high-dimensional tensor.",
      simplified: "Linear algebra gives us simple math recipes to shift, stretch, rotate, and combine giant grids of numbers all at once.",
      analogy: "A vector is an arrow pointing somewhere in space. A matrix is a projector lens that twists, scales, or rotates every arrow passing through it.",
      workedExample: {
        title: "Dot Product & Cosine Similarity",
        steps: [
          "1. Given vector A = [1, 2] and vector B = [3, 4].",
          "2. Dot product = (1 * 3) + (2 * 4) = 3 + 8 = 11.",
          "3. Geometrically, A · B = ||A|| * ||B|| * cos(θ). A positive dot product means vectors point in a similar direction."
        ],
        codeOrFormula: "A · B = sum(A_i * B_i)",
        takeaway: "The dot product measures alignment and similarity between high-dimensional feature vectors."
      },
      keyTerms: [
        { term: "Dot Product", definition: "Sum of element-wise products, quantifying directional alignment." },
        { term: "Matrix Transformation", definition: "A mapping that moves vectors while keeping grid lines parallel and evenly spaced." }
      ],
      misconceptions: [
        "Misconception: Matrices are just 2D tables of data. (Reality: Matrices are active transformations that distort vector space)."
      ]
    }
  },
  {
    id: "probability",
    domainId: "machine-learning",
    name: "Probability",
    slug: "probability",
    description: "Sample spaces, conditional probability, Bayes' Theorem, random variables, and probability distributions.",
    level: "beginner",
    estimatedMinutes: 240,
    stage: 1,
    learningObjectives: [
      "Master conditional probability and independence",
      "Apply Bayes' Theorem to update beliefs with new evidence",
      "Understand discrete vs continuous random variables",
      "Model likelihood functions for maximum likelihood estimation"
    ],
    resources: [
      { title: "Introduction to Probability", url: "https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/", type: "documentation", sourceName: "MIT OpenCourseWare" }
    ],
    explanation: {
      standard: "Machine learning algorithms operate in environments of uncertainty. Probability theory provides the formal framework for quantifying uncertainty and calculating likelihoods.",
      simplified: "Probability is the science of calculating odds so an AI can guess which answer is most likely to be true.",
      analogy: "Like a weather forecaster saying '80% chance of rain', ML models never say 'this is a cat with 100% certainty'—they output probability distributions.",
      workedExample: {
        title: "Bayes' Theorem for Spam Detection",
        steps: [
          "1. P(Spam) = 0.20 (prior belief).",
          "2. The email contains the word 'Winner'. P('Winner' | Spam) = 0.80, P('Winner' | Not Spam) = 0.05.",
          "3. P(Spam | 'Winner') = [0.80 * 0.20] / [(0.80 * 0.20) + (0.05 * 0.80)] = 0.16 / 0.20 = 0.80 (80% posterior)."
        ],
        codeOrFormula: "P(A | B) = [P(B | A) * P(A)] / P(B)",
        takeaway: "Bayes' Theorem updates the probability of a hypothesis as new evidence arrives."
      },
      keyTerms: [
        { term: "Prior Probability", definition: "Initial estimate of probability before new evidence is observed." },
        { term: "Posterior Probability", definition: "Updated probability calculated after accounting for new evidence." }
      ],
      misconceptions: [
        "Misconception: A 90% probability means the outcome will happen 9 out of 10 times in a specific test. (Reality: Probability is a long-term expectation)."
      ]
    }
  },
  {
    id: "statistics",
    domainId: "machine-learning",
    name: "Statistics",
    slug: "statistics",
    description: "Descriptive statistics, variance, standard deviation, hypothesis testing, confidence intervals, and the Central Limit Theorem.",
    level: "beginner",
    estimatedMinutes: 240,
    stage: 1,
    learningObjectives: [
      "Differentiate mean, median, variance, and standard deviation",
      "Understand the Central Limit Theorem and normal distributions",
      "Formulate null and alternative hypotheses",
      "Interpret p-values, z-scores, and confidence intervals"
    ],
    resources: [
      { title: "StatQuest: Statistical Fundamentals", url: "https://statquest.org/", type: "video", sourceName: "StatQuest" }
    ],
    explanation: {
      standard: "Statistics allows us to make inferences about broader populations from finite sample datasets, testing whether observed patterns are genuine or merely random noise.",
      simplified: "Statistics helps you check whether your data is telling the real truth or just tricking you with lucky coincidences.",
      analogy: "Like tasting one spoonful of soup to judge the whole pot: statistics tells you how big that spoonful must be to be confident in the flavor.",
      workedExample: {
        title: "Standard Deviation & Z-Score",
        steps: [
          "1. Mean exam score μ = 70, Standard Deviation σ = 10.",
          "2. A student scores 90. Z-score = (90 - 70) / 10 = +2.0.",
          "3. In a normal distribution, a z-score of +2.0 places the student in the top ~2.5% of the class."
        ],
        codeOrFormula: "Z = (X - μ) / σ",
        takeaway: "Standardization puts variables on a uniform scale with mean 0 and standard deviation 1."
      },
      keyTerms: [
        { term: "Variance", definition: "The average squared distance between individual data points and the mean." },
        { term: "Central Limit Theorem", definition: "The distribution of sample means approaches a normal bell curve as sample size grows." }
      ],
      misconceptions: [
        "Misconception: A low p-value proves an effect is large. (Reality: P-value only measures surprise under the null hypothesis, not effect magnitude)."
      ]
    }
  },
  {
    id: "data-analysis",
    domainId: "machine-learning",
    name: "Data Analysis & Preprocessing",
    slug: "data-analysis",
    description: "Exploratory data analysis (EDA), handling missing values, feature scaling (StandardScaler), outlier detection, and Pandas/NumPy pipelines.",
    level: "intermediate",
    estimatedMinutes: 300,
    stage: 2,
    learningObjectives: [
      "Clean raw datasets and impute missing values correctly",
      "Perform feature scaling using standardization and normalization",
      "Encode categorical variables with One-Hot and Ordinal encoding",
      "Detect multicollinearity and handle distribution skewness"
    ],
    resources: [
      { title: "Pandas User Guide", url: "https://pandas.pydata.org/docs/user_guide/index.html", type: "documentation", sourceName: "PyData" }
    ],
    explanation: {
      standard: "Real-world data is noisy, incomplete, and unscaled. Preprocessing transforms raw inputs into numerically consistent, high-signal matrices required by ML algorithms.",
      simplified: "Garbage in, garbage out. Preprocessing cleans, filters, and standardizes data before models touch it.",
      analogy: "Like washing, peeling, and cutting ingredients before cooking: no chef throws unwashed dirty vegetables into a gourmet soup.",
      workedExample: {
        title: "Preventing Data Leakage in Feature Scaling",
        steps: [
          "1. Always split dataset into Train and Test sets BEFORE scaling.",
          "2. Fit the scaler ONLY on the training set: `scaler.fit(X_train)`.",
          "3. Transform both train and test sets using the training parameters: `scaler.transform(X_test)`."
        ],
        codeOrFormula: "from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)",
        takeaway: "Fitting scalers on the entire dataset leaks future test information into model training."
      },
      keyTerms: [
        { term: "Data Leakage", definition: "When test set information accidentally contaminates model training." },
        { term: "StandardScaler", definition: "Scales features so mean = 0 and variance = 1." }
      ],
      misconceptions: [
        "Misconception: More features always lead to better predictions. (Reality: Irrelevant features create noise and cause the curse of dimensionality)."
      ]
    }
  },
  {
    id: "supervised-ml",
    domainId: "machine-learning",
    name: "Supervised Machine Learning",
    slug: "supervised-learning",
    description: "Linear regression, logistic regression, decision trees, random forests, loss functions, and gradient descent optimization.",
    level: "intermediate",
    estimatedMinutes: 360,
    stage: 2,
    learningObjectives: [
      "Formulate supervised tasks into features (X) and target labels (y)",
      "Derive Mean Squared Error (MSE) and Cross-Entropy loss",
      "Optimize parameters using Gradient Descent",
      "Implement decision trees, bagging, and Random Forest ensembles"
    ],
    resources: [
      { title: "Scikit-Learn Supervised Learning Guide", url: "https://scikit-learn.org/stable/supervised_learning.html", type: "documentation", sourceName: "Scikit-Learn" }
    ],
    explanation: {
      standard: "Supervised learning learns a predictive mapping function f(X) -> y from labeled training examples by iteratively minimizing a mathematical loss function.",
      simplified: "Teaching an AI by showing it thousands of practice questions with an answer key until it figures out the pattern.",
      analogy: "Like an apprentice chef tasting their stew against a master's benchmark: every iteration adjusts seasoning until the difference is minimal.",
      workedExample: {
        title: "Gradient Descent Weight Update",
        steps: [
          "1. Compute prediction error: loss = (y_pred - y_true)^2.",
          "2. Compute gradient: ∂Loss/∂w indicates whether increasing weight 'w' increases or decreases error.",
          "3. Update weight in opposite direction: w_new = w_old - (learning_rate * gradient)."
        ],
        codeOrFormula: "w = w - η * ∇L(w)",
        takeaway: "Gradient descent continuously takes small steps down the steepest error slope."
      },
      keyTerms: [
        { term: "Loss Function", definition: "Mathematical penalty function measuring discrepancy between prediction and ground truth." },
        { term: "Overfitting", definition: "Model memorizes training noise and fails to generalize to unseen test data." }
      ],
      misconceptions: [
        "Misconception: 100% training accuracy means your model is perfect. (Reality: It usually indicates severe overfitting)."
      ]
    }
  },
  {
    id: "model-evaluation",
    domainId: "machine-learning",
    name: "Model Evaluation & Validation",
    slug: "model-evaluation",
    description: "Precision, recall, F1 score, ROC-AUC curves, k-fold cross-validation, and bias-variance tradeoff diagnostics.",
    level: "intermediate",
    estimatedMinutes: 240,
    stage: 3,
    learningObjectives: [
      "Calculate and interpret confusion matrices (TP, FP, TN, FN)",
      "Understand the precision-recall trade-off in imbalanced datasets",
      "Execute k-fold stratified cross-validation",
      "Diagnose high bias vs high variance using learning curves"
    ],
    resources: [
      { title: "Evaluating Machine Learning Models", url: "https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall", type: "documentation", sourceName: "Google Machine Learning" }
    ],
    explanation: {
      standard: "Evaluation metrics measure model generalization ability under real-world conditions, distinguishing true predictive power from accuracy paradoxes on imbalanced classes.",
      simplified: "Testing your trained AI on a final exam it has never seen before to see if it actually understood the material.",
      analogy: "If a medical test says 'nobody has disease X' in a clinic where 99% are healthy, it has 99% accuracy but 0% recall and is completely useless.",
      workedExample: {
        title: "Precision vs Recall Calculation",
        steps: [
          "1. 100 cancer patients. Model flags 20 people: 16 true cancers (TP), 4 healthy (FP). Model missed 84 cancers (FN).",
          "2. Precision = TP / (TP + FP) = 16 / 20 = 80%. When it flags someone, it is right 80% of the time.",
          "3. Recall = TP / (TP + FN) = 16 / 100 = 16%. It missed 84% of sick patients!"
        ],
        codeOrFormula: "F1 = 2 * (Precision * Recall) / (Precision + Recall)",
        takeaway: "In critical domains (medicine, fraud), recall is often far more important than raw accuracy."
      },
      keyTerms: [
        { term: "Precision", definition: "Proportion of positive identifications that were actually correct." },
        { term: "Recall", definition: "Proportion of actual positives that were correctly identified." }
      ],
      misconceptions: [
        "Misconception: High accuracy is always good. (Reality: In imbalanced classes, predicting the majority class yields high fake accuracy)."
      ]
    }
  },
  {
    id: "deep-learning",
    domainId: "machine-learning",
    name: "Deep Learning & Neural Networks",
    slug: "deep-learning",
    description: "Perceptrons, multi-layer neural architectures, forward and backpropagation, activation functions (ReLU, Softmax), and PyTorch tensors.",
    level: "advanced",
    estimatedMinutes: 420,
    stage: 3,
    learningObjectives: [
      "Build multilayer perceptrons with non-linear activation functions",
      "Derive backpropagation through the chain rule of calculus",
      "Implement PyTorch training loops with DataLoader and optimizers",
      "Apply regularization techniques: Dropout, Batch Normalization, Weight Decay"
    ],
    resources: [
      { title: "PyTorch Deep Learning Zero to Mastery", url: "https://pytorch.org/tutorials/", type: "documentation", sourceName: "PyTorch.org" }
    ],
    explanation: {
      standard: "Deep learning models hierarchical representations through layered neural networks, automatically discovering relevant abstract features from raw inputs.",
      simplified: "Stacking layers of artificial neurons so the computer can detect edges, then shapes, then objects, and finally complex concepts.",
      analogy: "Like a hierarchical manufacturing plant: the first floor cuts raw sheets, the second welds parts, and the top floor inspects the finished car.",
      workedExample: {
        title: "Why Non-Linear Activation Functions (ReLU) Are Mandatory",
        steps: [
          "1. A linear layer is y = W * x + b.",
          "2. Two linear layers stacked: y = W2 * (W1 * x + b1) + b2 = (W2 * W1) * x + (W2 * b1 + b2) = W_combined * x + b_combined.",
          "3. Without non-linear activations like ReLU(x) = max(0, x), a 100-layer network mathematically collapses into a single linear regression!"
        ],
        codeOrFormula: "ReLU(z) = max(0, z)",
        takeaway: "Non-linear activations allow neural networks to approximate arbitrary complex functions."
      },
      keyTerms: [
        { term: "Backpropagation", definition: "Efficient calculation of gradients backwards through the network via the chain rule." },
        { term: "Vanishing Gradient", definition: "When gradients become tiny in deep layers, preventing earlier weights from updating." }
      ],
      misconceptions: [
        "Misconception: More layers always guarantee higher accuracy. (Reality: Deeper networks suffer from vanishing gradients and overfitting without skip connections)."
      ]
    }
  },
  {
    id: "capstone-projects",
    domainId: "machine-learning",
    name: "Real-World Machine Learning Projects",
    slug: "capstone-projects",
    description: "End-to-end production ML pipeline: data ingestion, training, evaluation, model serving, and CI/CD monitoring.",
    level: "advanced",
    estimatedMinutes: 480,
    stage: 4,
    learningObjectives: [
      "Architect an end-to-end ML pipeline on an open-source dataset",
      "Deploy models via FastAPI or ONNX runtime endpoints",
      "Track experiments and hyperparameter optimization with MLflow",
      "Document methodology, trade-offs, and failure modes in a technical report"
    ],
    resources: [
      { title: "Full Stack Deep Learning", url: "https://fullstackdeeplearning.com/", type: "article", sourceName: "Full Stack DL" }
    ],
    explanation: {
      standard: "Translating algorithmic prototypes into maintainable software products that handle drift, latency, and real-world edge cases.",
      simplified: "Taking your trained model out of a private Jupyter notebook and putting it into a real web app that real users can query.",
      analogy: "Like the difference between baking a cake for your family vs running a commercial bakery with supply chains and health inspections.",
      workedExample: {
        title: "End-to-End Pipeline Checklist",
        steps: [
          "1. Ingestion: Validate input schema with Pydantic.",
          "2. Inference: Load pre-warmed weights into memory.",
          "3. Postprocessing: Format probability and explanation payloads.",
          "4. Monitoring: Log latency and detect distribution drift."
        ],
        codeOrFormula: "FastAPI + ONNX Runtime + Docker",
        takeaway: "A machine learning model only creates value when it reliably serves real predictions."
      },
      keyTerms: [
        { term: "Model Drift", definition: "Degradation of prediction performance when production data shifts away from training distribution." },
        { term: "Inference Latency", definition: "Time taken between receiving a request and returning the prediction." }
      ],
      misconceptions: [
        "Misconception: ML engineering ends when test accuracy is high. (Reality: Maintenance, monitoring, and data drift represent 80% of project lifecycle)."
      ]
    }
  }
];

export const ML_DEPENDENCIES: SkillDependency[] = [
  // Stage 1 -> Stage 1 internal
  {
    id: "dep-prob-stat",
    prerequisiteSkillId: "probability",
    dependentSkillId: "statistics",
    isRequired: true,
    reason: "Statistics builds directly on probability distributions and random variables."
  },
  // Stage 1 -> Stage 2 (Data Analysis)
  {
    id: "dep-py-analysis",
    prerequisiteSkillId: "py-fundamentals",
    dependentSkillId: "data-analysis",
    isRequired: true,
    reason: "Data analysis requires fluent Python syntax and NumPy array manipulation."
  },
  {
    id: "dep-linalg-analysis",
    prerequisiteSkillId: "linear-algebra",
    dependentSkillId: "data-analysis",
    isRequired: true,
    reason: "Feature scaling and multidimensional projections rely on vector operations."
  },
  {
    id: "dep-stat-analysis",
    prerequisiteSkillId: "statistics",
    dependentSkillId: "data-analysis",
    isRequired: true,
    reason: "Exploratory analysis requires descriptive statistics and variance measures."
  },
  // Stage 2 -> Supervised ML
  {
    id: "dep-analysis-supervised",
    prerequisiteSkillId: "data-analysis",
    dependentSkillId: "supervised-ml",
    isRequired: true,
    reason: "Supervised models cannot train on raw, unscaled, or un-encoded datasets."
  },
  // Stage 2 -> Stage 3 (Evaluation & Deep Learning)
  {
    id: "dep-supervised-eval",
    prerequisiteSkillId: "supervised-ml",
    dependentSkillId: "model-evaluation",
    isRequired: true,
    reason: "Model evaluation requires understanding baseline predictors and loss functions."
  },
  {
    id: "dep-supervised-deep",
    prerequisiteSkillId: "supervised-ml",
    dependentSkillId: "deep-learning",
    isRequired: true,
    reason: "Neural networks extend supervised gradient descent to multilayer structures."
  },
  {
    id: "dep-linalg-deep",
    prerequisiteSkillId: "linear-algebra",
    dependentSkillId: "deep-learning",
    isRequired: true,
    reason: "Backpropagation and tensor contractions are pure linear algebra matrix operations."
  },
  // Stage 3 -> Stage 4 (Capstone Projects)
  {
    id: "dep-eval-capstone",
    prerequisiteSkillId: "model-evaluation",
    dependentSkillId: "capstone-projects",
    isRequired: true,
    reason: "Capstone projects must demonstrate rigorous cross-validation and evaluation."
  },
  {
    id: "dep-deep-capstone",
    prerequisiteSkillId: "deep-learning",
    dependentSkillId: "capstone-projects",
    isRequired: true,
    reason: "Capstone projects implement production-grade neural or ensemble architectures."
  }
];

export const ML_DIAGNOSTIC_ASSESSMENT: DiagnosticAssessment = {
  id: "ml-diagnostic-v1",
  domainId: "machine-learning",
  title: "Machine Learning Diagnostic Assessment",
  description: "Evaluate your foundational and intermediate readiness across Python, Math, Statistics, and Preprocessing.",
  passingThreshold: 70,
  questions: [
    {
      id: "q-py-1",
      question: "Which of the following creates a new list containing squares of even numbers from `[1, 2, 3, 4, 5, 6]` in idiomatic Python?",
      options: [
        "[x*2 for x in nums if x % 2 == 0]",
        "[x**2 for x in nums if x % 2 == 0]",
        "nums.filter(x => x % 2 == 0).map(x => x**2)",
        "[for x in nums if x % 2 == 0: x**2]"
      ],
      correctIndex: 1,
      conceptTag: "py-fundamentals",
      explanation: "List comprehension syntax in Python is `[expression for item in iterable if condition]`. `x**2` calculates the power of 2."
    },
    {
      id: "q-linalg-1",
      question: "What is the dot product of two orthogonal (perpendicular) vectors in Euclidean space?",
      options: [
        "1",
        "-1",
        "0",
        "Undefined"
      ],
      correctIndex: 2,
      conceptTag: "linear-algebra",
      explanation: "Because A · B = ||A|| * ||B|| * cos(90°), and cos(90°) = 0, the dot product of perpendicular vectors is always 0."
    },
    {
      id: "q-prob-1",
      question: "If event A and event B are statistically independent, what is P(A and B)?",
      options: [
        "P(A) + P(B)",
        "P(A) * P(B)",
        "P(A | B) / P(B)",
        "P(A) - P(B)"
      ],
      correctIndex: 1,
      conceptTag: "probability",
      explanation: "For independent events, the joint probability is the product of their individual probabilities: P(A ∩ B) = P(A) * P(B)."
    },
    {
      id: "q-stat-1",
      question: "According to the Central Limit Theorem, as sample size n increases, the distribution of sample means approaches:",
      options: [
        "A uniform distribution",
        "A bimodal distribution",
        "A normal distribution, regardless of the underlying population shape",
        "An exponential distribution"
      ],
      correctIndex: 2,
      conceptTag: "statistics",
      explanation: "The Central Limit Theorem proves that sample means approach a Gaussian normal bell curve as n becomes large (typically n ≥ 30)."
    },
    {
      id: "q-prep-1",
      question: "Why must feature scalers (e.g. StandardScaler) be fit ONLY on the training dataset rather than the whole dataset?",
      options: [
        "To save CPU memory",
        "To prevent data leakage from the test set contaminating training parameters",
        "StandardScaler does not work on large datasets",
        "Because test data must never be normalized"
      ],
      correctIndex: 1,
      conceptTag: "data-analysis",
      explanation: "Fitting on the entire dataset leaks distribution statistics (mean, variance) of unseen test data into training, giving misleadingly high validation accuracy."
    },
    {
      id: "q-ml-1",
      question: "What is the primary danger of a model achieving 99.9% training accuracy while validation accuracy is 62%?",
      options: [
        "High bias (underfitting)",
        "High variance (overfitting to training noise)",
        "Vanishing gradients",
        "Insufficient learning rate"
      ],
      correctIndex: 1,
      conceptTag: "supervised-ml",
      explanation: "A large divergence between high training accuracy and low validation accuracy is the textbook signature of severe overfitting."
    }
  ]
};
