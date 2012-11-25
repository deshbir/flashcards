<!-- Top  Navbar for logo, brand, menu, and language selection -->
<div class="navbar">
    <div class="navbar-inner">
        <div class="container">
            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                <!-- This is shown for mobile devices - collapsed icon -->
                <i class="icon-align-justify"></i>
            </a>
            <a class="brand" title="Pearson Health Sciences & Careers" href="#/home">
                <img src="http://placehold.it/64x32" alt=logo"><span>Pearson</span>
            </a>
            <div class="nav-collapse">
	<ul class="nav pull-right">
	{{#user}}
		<!-- Logged In Menu Options	 START -->
		<li class="{{home}}"><a href="#/home">Home</a></li>
		<li class="{{disciplines}}"><a href="#/discipline">Disciplines</a></li>
		<li class="{{products}}"><a href="#/discipline">Products</a></li>
	
		<li class="divider-vertical"></li>
	
		<li class="dropdown">
			<!-- User Preferences Menu Option START --> <a href="#"
			class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user"></i><b class="caret"></b></a>
			<ul class="dropdown-menu">
				<li><a href="#"> (Profile)</a></li>
				<li class="divider"></li>
				<li><a rel="tooltip" data-original-title="Not active in demo"
					href="#">Preferences</a></li>
				<li><a href="javascript:void(0);" onclick="Authenticate.logout()">Sign out</a></li>
			</ul>
		</li>
	
		<li class="divider-vertical"></li>
		<!-- Logged In Menu END-->
	{{/user}}
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
</div>


