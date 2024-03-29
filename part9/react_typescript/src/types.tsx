export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CourseDescriptionPart extends CoursePartBase {
  description: string
}

export interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
  //description: string;
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  //description: string;
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special";
  requirements: string[]
}



export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;