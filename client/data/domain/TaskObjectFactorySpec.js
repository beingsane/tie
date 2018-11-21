// Copyright 2017 The TIE Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for TaskObject domain objects.
 */

describe('TaskObjectFactory', function() {
  var QuestionObjectFactory;
  var question;

  beforeEach(module('tie'));
  beforeEach(module('tieData'));
  beforeEach(inject(function($injector) {
    QuestionObjectFactory = $injector.get("QuestionObjectFactory");

    question = QuestionObjectFactory.create({
      title: 'title',
      starterCode: 'starterCode',
      tasks: [{
        instructions: [{
          content: 'For this question, you will implement isBalanced().',
          type: 'text'
        }, {
          content: 'Input: "(())"\nOutput: True',
          type: 'code'
        }],
        outputFunctionName: 'AuxiliaryCode.lettersOnly',
        testSuites: [],
        buggyOutputTests: [],
        suiteLevelTests: [],
        performanceTests: []
      }, {
        instructions: [{
          content: 'some code',
          type: 'code'
        }, {
          content: 'abc',
          type: 'text'
        }, {
          content: 'def',
          type: 'text'
        }],
        outputFunctionName: 'System.extendString',
        testSuites: [],
        buggyOutputTests: [],
        suiteLevelTests: [],
        performanceTests: []
      }]
    });
  }));

  describe('getOutputFunctionNameWithoutClass', function() {
    it('should properly get OutputFunctionName without the class name',
      function() {
        expect(question.getTasks()[0].getOutputFunctionNameWithoutClass())
          .toEqual('lettersOnly');
        expect(question.getTasks()[1].getOutputFunctionNameWithoutClass())
          .toEqual('extendString');
      });
  });

  describe('getTextInstructions', function() {
    it('should get the text instructions for a task', function() {
      expect(question.getTasks()[0].getTextInstructions())
        .toEqual('For this question, you will implement isBalanced(). ');
      expect(question.getTasks()[1].getTextInstructions())
        .toEqual('abc def ');
    });
  });
});
