package com.pearson.hsc

class Question implements Comparable {

	String type
	String text
	int sequence
	float maxscore
	String mediatype
	String imageurl
	String audiourl
	String videourl
	String option1
	String option2
	String option3
	String option4
	String option5
	String option6
	String option7
	String answer1
	String answer2
	String answer3
	String answer4
	String answerDetails
	
	static belongsTo = [test: Test]
	
	static constraints = {
	}

	static mapping = {
		answerDetails type: 'text'
	}
	
	int compareTo(def val) {
		return sequence <=> val?.sequence
	}
	
	/***********************************
	 * START Offline configurations
	 ***********************************/
	
	def static String[] offlineCachedUrls() {
		return  ["/api/discipline/1/product/1",
				 "/api/discipline/1/product/2",
				 "/api/discipline/1/product/3",
				 "/api/discipline/2/product/11",
				 "/api/discipline/2/product/12",
				 "/api/discipline/2/product/13"];
	}
		
	/******************************
	 * END Offline configurations
	 *******************************/

}
