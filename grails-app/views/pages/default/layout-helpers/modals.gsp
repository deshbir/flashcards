<!-- Modal -->
<div id="ajax-error-modal" class="modal hide fade" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">x</button>
		<h3 id="ajax-error-label">
			Oops!
		</h3>
	</div>
	<div class="modal-body">
		<h4 class="content-header"></h4>
		<div class="content-body">
			<ul id="myTab" class="nav nav-tabs">
				<li class="active"><a href="#logs" data-toggle="tab">Logs</a></li>
				<li class=""><a href="#message" data-toggle="tab">Message</a></li>
				<li class=""><a href="#headers" data-toggle="tab">Headers-Parameters</a></li>
			</ul>
			<div id="myTabContent" class="tab-content">
				<div class="tab-pane fade active in" id="logs">
				</div>
				<div class="tab-pane fade" id="message">
				</div>
				<div class="tab-pane fade" id="headers">
				</div>
			</div>
		</div>
	</div>

	<div class="modal-footer">
		<button class="btn generateErrorReport" data-dismiss="modal" aria-hidden="true">
			Generate Error Report
		</button>
		<button class="btn" data-dismiss="modal" aria-hidden="true">
			OK
		</button>
	</div>
</div>

<!-- Modal -->
<div id="error-report" class="modal hide fade" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">x</button>
		<h3 id="ajax-error-label">
			Error Report
		</h3>
	</div>
	<div class="modal-body">
		<h4 class="content-header"></h4>
		<div class="content-body">
			ERROR RRRRRRRRRRRRRRRR
		
		</div>
	</div>

	<div class="modal-footer">
		<button class="btn" data-dismiss="modal" aria-hidden="true">
			OK
		</button>
	</div>
</div>

