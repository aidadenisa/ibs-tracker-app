type Message = string | null;

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

const courseParts: CoursePart[] = []

const multiply = (a: number, b: number, message: Message): number => {
  console.log( a * b , message);
  return a*b;
};

const divide = (a: number, b: number) => {
  if(b === 0) {
    throw new Error('Cannot divide by 0');
  }
  return a/b;
}

multiply(3, 1, null);

try {
  divide(2,0);
} catch(error: unknown) {
  // error here is of type UNKNOWN and we have to use instanceof to check if its type is indeed Error
  // here we can not use error.message
  if(error instanceof Error) {
    // the type is narrowed and we can refer to error.message
    console.log(error.message);
  }
  // here we can not use error.message
}