/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTeaser = /* GraphQL */ `
  mutation CreateTeaser(
    $input: CreateTeaserInput!
    $condition: ModelTeaserConditionInput
  ) {
    createTeaser(input: $input, condition: $condition) {
      id
      title
      description
      filePath
      likes
      owner
      createdAt
      updatedAt
    }
  }
`;
export const updateTeaser = /* GraphQL */ `
  mutation UpdateTeaser(
    $input: UpdateTeaserInput!
    $condition: ModelTeaserConditionInput
  ) {
    updateTeaser(input: $input, condition: $condition) {
      id
      title
      description
      filePath
      likes
      owner
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeaser = /* GraphQL */ `
  mutation DeleteTeaser(
    $input: DeleteTeaserInput!
    $condition: ModelTeaserConditionInput
  ) {
    deleteTeaser(input: $input, condition: $condition) {
      id
      title
      description
      filePath
      likes
      owner
      createdAt
      updatedAt
    }
  }
`;
export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
      type
      id
      content
      owner
      timestamp
    }
  }
`;
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
      type
      id
      content
      owner
      timestamp
    }
  }
`;
