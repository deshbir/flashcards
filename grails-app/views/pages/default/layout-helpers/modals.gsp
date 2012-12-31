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
		<div id="no-network">
			You don't seem to have Internet connectivity at this time. Please check your devices settings and restart the App. In case you’re out of network range, please try again once internet is available.
		</div>
	</div>

	<div class="modal-footer">
		<button class="btn generateErrorReport" data-dismiss="modal" aria-hidden="true">
			Generate Report
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
			HSC App Error Report
		</h3>
	</div>
	<div class="modal-body">
		<div class="date">
			<div>
				<span class="header">Date:</span>
				<span class="date-data"></span>
			</div>
			<div>
				<span class="header">Version:</span>
				<span class="version-data"></span>
			</div>
		</div>
		<h4 class="content-header"></h4>
		<div class="content-body">
			<h4 class="orange-color">Message</h4>
			<div class="message logContent"></div>
			<h4 class="orange-color">Logs</h4>
			<div class="logs logContent"></div>
			<h4 class="orange-color">Headers & Parameters</h4>
			<div class="params logContent"></div>
		</div>
	</div>
	<div class="modal-footer">
		<span class="pull-left">Please copy report (clipboard) and email to system admin.</span>
		<span class="pull-right"><button class="btn" data-dismiss="modal" aria-hidden="true">
			Ok
		</button></span>
	</div>
</div>

