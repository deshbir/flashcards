<ul class="nav pull-right">
	{{#user}}
	<!-- Logged In Menu Options	 START -->
	<li class="active"><a href="#">Home</a></li>
	<li class=""><a href="#">Disciplines</a></li>
	<li class=""><a href="#">Products</a></li>

	<li class="divider-vertical"></li>

	<li class="dropdown">
		<!-- User Preferences Menu Option START --> <a href="#"
		class="dropdown-toggle" data-toggle="dropdown"><i class="icon-user"></i><b class="caret"></b></a>
		<ul class="dropdown-menu">
			<li><a href="#"> (Profile)</a></li>
			<li class="divider"></li>
			<li><a rel="tooltip" data-original-title="Not active in demo"
				href="#">Preferences</a></li>
			<li><a href="/ngldemo/ngconnect/traditional/logout">Sign out</a></li>
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