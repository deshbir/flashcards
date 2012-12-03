    <div class="navbar-inner">
        <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <!-- This is shown for mobile devices - collapsed icon -->
                <i class="icon-align-justify"></i>
            </a>
			<div class="brand-button">
                <a id="back" class="btn btn-mini pull-left"><i class="icon-chevron-left"></i> Back</a>
			</div>
            
            <div class="brand">
    			<a title="Pearson Health Sciences & Careers">Pearson</a>
			</div>

            <div class="nav-collapse">
				<ul class="nav pull-right">
					<!-- Logged In Menu Options	 START -->
					<li id="home" class="{{home}} loggedin"><a href="#"><i class="icon-home"></i></a></li>	
					<li class="divider-vertical loggedin"></li>
				
					<li class="dropdown loggedin">
						<!-- User Preferences Menu Option START --> <a href="#"
						class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user"></i><b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="#"> (Profile)</a></li>
							<li class="divider"></li>
							<li><a rel="tooltip" data-original-title="Not active in demo"
								href="#">Preferences</a></li>
							<li id="logout"><a href="javascript:void(0);">Sign out</a></li>
						</ul>
					</li>
				
					<li class="divider-vertical loggedin"></li>
					<!-- Logged In Menu END-->
					<!-- App Preferences Menu Option START (available to Logged out users also) -->
					<li class="dropdown"><a href="#" class="dropdown-toggle"
						data-toggle="dropdown"><i class="icon-cog"></i><b class="caret"></b></a>
						<ul class="dropdown-menu">
							<li><a href="?lang=en">English</a></li>
							<li><a href="?lang=ja">Japanese</a></li>
							<li><a href="?lang=ar">Arabic</a></li>
						</ul></li>
					<!-- App Preferences Menu Option END-->
				</ul>
            </div><!--/.nav-collapse -->
        </div>
    </div>

