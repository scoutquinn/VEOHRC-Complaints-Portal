
import $ from "jquery";
import Foundation from "foundation-sites";

/*
Return function for form. just outputs to console currently
*/

function showResults(values) {
  $('#resultsModal pre').html(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  $('#resultsModal').foundation('open');
};

export default showResults; 