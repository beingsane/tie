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
 * @fileoverview Object factory for the speech Balloons shown in the
 * conversation log.
 */

tie.factory('SpeechBalloonObjectFactory', [
  'FeedbackParagraphObjectFactory', function(FeedbackParagraphObjectFactory) {

    // A balloon representing code submitted by the user.
    var SPEECH_BALLOON_TYPE_CODE = 'code';
    // A balloon representing feedback given by TIE.
    var SPEECH_BALLOON_TYPE_FEEDBACK = 'feedback';

    var ALLOWED_SPEECH_BALLOON_TYPES = [
      SPEECH_BALLOON_TYPE_CODE,
      SPEECH_BALLOON_TYPE_FEEDBACK
    ];

    /**
     * Constructor for SpeechBalloon.
     *
     * @param {string} type The type of the balloon.
     * @param {Array<FeedbackParagraph>} feedbackParagraphs The contents of the
     *   balloon, represented as FeedbackParagraph objects.
     * @constructor
     */
    var SpeechBalloon = function(type, feedbackParagraphs) {
      /**
       * @type {string}
       * @private
       */
      this._type = type;

      /**
       * @type {Array}
       * @private
       */
      this._feedbackParagraphs = feedbackParagraphs;
    };

    // Instance methods.

    /**
     * A getter for the feedbackParagraphs list for this speech balloon.
     *
     * @returns {Array}
     */
    SpeechBalloon.prototype.getFeedbackParagraphs = function() {
      return this._feedbackParagraphs;
    };

    /**
     * Returns whether the speech balloon is displayed on the left.
     *
     * @returns {boolean}
     */
    SpeechBalloon.prototype.isDisplayedOnLeft = function() {
      return this._type === SPEECH_BALLOON_TYPE_FEEDBACK;
    };

    /**
     * Returns whether the current balloon is a code submission.
     *
     * @returns {boolean}
     */
    SpeechBalloon.prototype.isCodeSubmission = function() {
      return this._type === SPEECH_BALLOON_TYPE_CODE;
    };

    /**
     * Converts the current speech balloon to a raw JavaScript object.
     *
     * @returns {object} A JavaScript object representing the speech balloon.
     */
    SpeechBalloon.prototype.toDict = function() {
      return {
        type: (
          this.isCodeSubmission() ?
          SPEECH_BALLOON_TYPE_CODE : SPEECH_BALLOON_TYPE_FEEDBACK),
        feedbackParagraphDicts: this.getFeedbackParagraphs().map(
          function(feedbackParagraph) {
            return feedbackParagraph.toDict();
          }
        )
      };
    };

    // Static class methods.

    /**
     * Creates and returns a SpeechBalloon object representing a feedback
     * balloon.
     *
     * @param {Array<FeedbackParagraph>} feedbackParagraphs The contents of the
     *   Balloon, represented as FeedbackParagraph objects.
     * @returns {SpeechBalloon}
     */
    SpeechBalloon.createFeedbackBalloon = function(feedbackParagraphs) {
      return new SpeechBalloon(
        SPEECH_BALLOON_TYPE_FEEDBACK, feedbackParagraphs);
    };

    /**
     * Creates and returns a SpeechBalloon object representing a code balloon.
     *
     * @param {string} submittedCode The code submitted by the learner.
     * @returns {SpeechBalloon}
     */
    SpeechBalloon.createCodeBalloon = function(submittedCode) {
      var codeParagraphs = [FeedbackParagraphObjectFactory.createCodeParagraph(
        submittedCode)];
      return new SpeechBalloon(SPEECH_BALLOON_TYPE_CODE, codeParagraphs);
    };

    /**
     * Creates a SpeechBalloon object from a JavaScript object.
     *
     * @param {Object} speechBalloonDict A JavaScript object representing a
     *   speech balloon.
     * @returns {SpeechBalloon}
     */
    SpeechBalloon.fromDict = function(speechBalloonDict) {
      if (ALLOWED_SPEECH_BALLOON_TYPES.indexOf(speechBalloonDict.type) === -1) {
        throw Error('Invalid speech balloon type: ' + speechBalloonDict.type);
      }

      return new SpeechBalloon(
        speechBalloonDict.type,
        speechBalloonDict.feedbackParagraphDicts.map(
          function(feedbackParagraphDict) {
            return FeedbackParagraphObjectFactory.fromDict(
              feedbackParagraphDict);
          }
        )
      );
    };

    return SpeechBalloon;
  }
]);
